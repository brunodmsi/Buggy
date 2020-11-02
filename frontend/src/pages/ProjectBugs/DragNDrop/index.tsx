import React, { useState, useEffect, useCallback } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DraggableLocation,
} from 'react-beautiful-dnd';
import { useHistory } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';

import api from '../../../services/api';

import { typeOptions } from '../../../utils/getBugOptions';

import { Container, GroupWrapper, Group, Item, Footer } from './styles';

import Tag from '../../../components/Tag';

import { IDragAndDropDataProps } from '..';
import avatarPlaceholder from '../../../assets/avatar_placeholder.png';

interface DragNDropProps {
  data: IDragAndDropDataProps;
  openModal: (group: string) => void;
}

const DragNDrop: React.FC<DragNDropProps> = ({ data, openModal }) => {
  const history = useHistory();
  const [list, setList] = useState(data);

  useEffect(() => {
    setList(data);
  }, [setList, data]);

  const handleItemClick = useCallback(
    (id: string) => {
      history.push(`/bugs/${id}`);
    },
    [history],
  );

  const onDragEnd = useCallback(
    async (result: DropResult): Promise<void> => {
      if (!result.destination) return;

      const { source, destination } = result;
      const dest = (destination as unknown) as DraggableLocation;

      if (source.droppableId !== destination.droppableId) {
        const sourceColumn = list[source.droppableId];
        const destColumn = list[destination.droppableId];

        const sourceItems = Array.from(sourceColumn.items);
        const destItems = Array.from(destColumn.items);

        const [removed] = sourceItems.splice(source.index, 1);

        destItems.splice(destination.index, 0, removed);

        setList({
          ...list,
          [source.droppableId]: {
            ...sourceColumn,
            items: sourceItems,
          },
          [destination.droppableId]: {
            ...destColumn,
            items: destItems,
          },
        });

        await api.patch(`/bugs/${removed.id}/group`, {
          new_group: destination.droppableId,
        });
      } else {
        const column = list[source.droppableId];
        const copiedItems = Array.from(column.items);
        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(dest.index, 0, removed);

        setList({
          ...list,
          [source.droppableId]: {
            ...column,
            items: copiedItems,
          },
        });
      }
    },
    [list],
  );

  return (
    <Container>
      <DragDropContext onDragEnd={result => onDragEnd(result)}>
        {Object.entries(list).map(([id, column]) => (
          <Droppable droppableId={id} key={id}>
            {(providedDrop, snapshotDrop) => (
              <GroupWrapper>
                <p>{column.name}</p>

                <Group
                  {...providedDrop.droppableProps}
                  ref={providedDrop.innerRef}
                  isDragging={snapshotDrop.isDraggingOver}
                >
                  {column.items.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(providedDrag, snapshotDrag) => (
                        <Item
                          {...providedDrag.draggableProps}
                          {...providedDrag.dragHandleProps}
                          ref={providedDrag.innerRef}
                          isDragging={snapshotDrag.isDragging}
                          draggableStyle={providedDrag.draggableProps.style}
                          onClick={() => handleItemClick(item.id)}
                        >
                          <Tag
                            name={
                              typeOptions.find(
                                option => option.value === item.type,
                              )?.value
                            }
                            backgroundColor="#B080F8"
                          />

                          <p>{item.title}</p>

                          <Footer priorityBackColor="#c34343">
                            <div>
                              {item.bug_developers.map(
                                ({ user: developer }) => {
                                  if (!developer.avatar)
                                    return (
                                      <img
                                        src={avatarPlaceholder}
                                        alt={developer.id}
                                      />
                                    );

                                  return (
                                    <img
                                      src={developer.avatar_url}
                                      alt={developer.id}
                                    />
                                  );
                                },
                              )}
                            </div>

                            <p>
                              <strong>ALTA</strong>
                            </p>
                          </Footer>
                        </Item>
                      )}
                    </Draggable>
                  ))}
                  {providedDrop.placeholder}

                  <button type="button" onClick={() => openModal(id)}>
                    <FiPlus size={25} /> Adicionar novo
                  </button>
                </Group>
              </GroupWrapper>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </Container>
  );
};

export default DragNDrop;
