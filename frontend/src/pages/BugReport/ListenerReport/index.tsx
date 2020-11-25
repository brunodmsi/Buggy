import React from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { Container } from './styles';

import { BugListenerReport } from '..';

interface ListenerReportProps {
  data: BugListenerReport;
}

const ListenerReport: React.FC<ListenerReportProps> = ({ data }) => {
  return (
    <>
      {!!data && (
        <Container>
          <h3>Detalhes do erro</h3>

          <table>
            <tr>
              <th>Tipo do erro</th>
              <td>{data.name}</td>
            </tr>
            <tr>
              <th>Mensagem</th>
              <td>{data.message}</td>
            </tr>
            <tr>
              <th>Onde?</th>
              <td>{(data.stack_where && data.stack_where) || 'Vazio'}</td>
            </tr>
            <tr>
              <th>Em qual linha?</th>
              <td>{(data.stack_line && data.stack_line) || 'Vazio'}</td>
            </tr>
            <tr>
              <th>Query do erro</th>
              <td>{(data.error_query && data.error_query) || 'Vazio'}</td>
            </tr>
            <tr>
              <th>Quando?</th>
              <td>
                {data.created_at &&
                  format(
                    new Date(data.created_at),
                    "dd 'de' MMMM 'de' yyyy 'às' HH:mm'h'",
                    {
                      locale: ptBR,
                    },
                  )}
              </td>
            </tr>
            <tr>
              <span>Requisição</span>
              <td className="td-heading" />
            </tr>
            <tr>
              <th>URL</th>
              <td>
                {(data.request_url &&
                  `${data.request_url_protocol}://${data.request_url}${data.request_url_path}`) ||
                  'Vazio'}
              </td>
            </tr>
            <tr>
              <th>Cabeçalho</th>
              <td>
                {(data.request_headers && data.request_headers) || 'Vazio'}
              </td>
            </tr>
            <tr>
              <th>Corpo</th>
              <td>{(data.request_body && data.request_body) || 'Vazio'}</td>
            </tr>
            <tr>
              <th>Método</th>
              <td>{(data.request_method && data.request_method) || 'Vazio'}</td>
            </tr>
            <tr>
              <th>Parâmetros</th>
              <td>{(data.request_params && data.request_params) || 'Vazio'}</td>
            </tr>
            <tr>
              <th>Query</th>
              <td>{(data.request_query && data.request_query) || 'Vazio'}</td>
            </tr>
          </table>
        </Container>
      )}
    </>
  );
};

export default ListenerReport;
