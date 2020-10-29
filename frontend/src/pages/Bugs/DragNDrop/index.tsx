import React, { useState, useCallback, useRef, useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';

import { Container, GroupWrapper, Group, Item, Footer } from './styles';

import Tag from '../../../components/Tag';

interface DragNDropProps {
  data: {
    title: string;
    items: {
      tag: {
        name: string;
        color: string;
      },
      text: string;
      image_url: string;
      priority: {
        type: string;
        backColor: string;
      };
    }[];
  }[];
}

interface OtherProps {
  openModal?: () => void;
}

interface ItemParams {
  groupIndex: number;
  itemIndex: number;
}

const DragNDrop: React.FC<DragNDropProps & OtherProps> = ({ data, openModal }) => {
  const [list, setList] = useState(data);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    setList(data);
  }, [setList, data])

  const dragItem = useRef<ItemParams>();
  const dragNode = useRef();

  useEffect(() => { console.log(dragging); console.log() })

  const handleDragEnter = (event: React.DragEvent, targetItem: ItemParams) => {
    const currentItem = dragItem.current as ItemParams;
    // console.log(currentItem);

    if (event.target !== dragNode.current) {
      setList(oldList => {
        let newList = JSON.parse(JSON.stringify(oldList));
        newList[targetItem.groupIndex].items.splice(
          targetItem.itemIndex, 0,
          newList[currentItem.groupIndex].items.splice(
            currentItem.itemIndex, 1
          )[0]
        );
        dragItem.current = targetItem;
        localStorage.setItem('@buggy:kanbanList', JSON.stringify(list));
        return newList;
      })
    }
  }

  const handleDragEnd = useCallback(() => {
    // console.log('ending drag');
    document.removeEventListener('dragend', handleDragEnd);
    dragItem.current = undefined;
    setDragging(false);
    dragNode.current = undefined;
  }, [])

  const handleDragStart = useCallback((event, targetItem) => {
    // console.log('drag starting...', params)
    dragNode.current = event.target;
    document.addEventListener('dragend', handleDragEnd);
    dragItem.current = targetItem;

    setTimeout(() => {
      setDragging(true);
    }, 0);
  }, [handleDragEnd])

  const isDraggingCurrent =
    (groupIndex: number, itemIndex: number) => {
      return  dragging &&
              dragItem.current?.groupIndex === groupIndex &&
              dragItem.current?.itemIndex === itemIndex;
    };

  return (
    <Container>
      {list.map((group, groupIndex) => (
        <GroupWrapper key={groupIndex + 'wrapper'}>
          <p>{group.title}</p>

          <Group
            key={groupIndex + 'group'}
            onDragEnter={
              dragging && !group.items.length ?
              e => handleDragEnter(e, { groupIndex, itemIndex: 0 }) :
              undefined
            }
          >
            {group.items.map((item, itemIndex) => (
              <Item
                dragging={isDraggingCurrent(groupIndex, itemIndex)}
                onDragStart={(e: React.DragEvent) => handleDragStart(e, { groupIndex, itemIndex })}
                onDragEnter={
                  dragging ? (e: React.DragEvent) => handleDragEnter(e, { groupIndex, itemIndex })
                  : undefined
                }
                draggable
                key={`${groupIndex}-${itemIndex}`}
                to="/bug"
              >
                {/* {!(isDraggingCurrent(groupIndex, itemIndex)) && ( */}
                  <>
                    <Tag name={item.tag.name} backgroundColor={item.tag.color} />

                    <p>{item.text}</p>

                    <Footer priorityBackColor={item.priority.backColor}>
                      <img src={item.image_url} alt="Developer"/>

                      <p><strong>{item.priority.type}</strong></p>
                    </Footer>
                  </>
                {/* )} */}
              </Item>
            ))}

            <button type="button" onClick={openModal}><FiPlus size={25} /> Adicionar novo</button>
          </Group>
        </GroupWrapper>
      ))}
    </Container>
  )
}

export default DragNDrop;
