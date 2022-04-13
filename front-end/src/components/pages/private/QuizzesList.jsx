import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Col, Divider, Row } from 'antd';
import { getQuizzes } from '../../../actions/quiz';
import { EditableTable } from '../../editable-table/EditableTable';
import { columns } from '../../../assets/data/quiz.dataConfig';
//import { PrintActionRender } from './PrintActionRender';

export const QuizzesList = () => {
  const dispatch = useDispatch();
  const [quizzes, setQuizzes] = useState(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);

  useEffect(() => {
    let abortController = new AbortController();

    const fetchData = async () => {
      const { len, result } = await dispatch(getQuizzes(page, size));

      setQuizzes(result);
      setTotal(len);
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [page, size, dispatch]);

  /* if (!columns.find((obj) => obj.key === 'action')) {
    columns.push({
      title: '',
      key: 'action',
      width: 10,
      render: PrintActionRender,
    });
  } */

  const pagination = {
    total,
    current: page,
    pageSize: size,
    position: 'top',
    onChange: (current) => {
      setPage(current);
    },
    onShowSizeChange: (current, pageSize) => {
      setPage(current);
      setSize(pageSize);
    },
    showSizeChanger: true,
  };

  return (
    <Row className='--stock-page__row' justify='center'>
      <Col xs={24} lg={14}>
        <Divider className='--products__divider' orientation='center'>
          Listado de Cuestionarios
        </Divider>
        {quizzes?.length > 0 && (
          <div className='--products__container'>
            <EditableTable cols={columns} dataSource={quizzes} pagination={pagination} />
          </div>
        )}
      </Col>
    </Row>
  );
};
