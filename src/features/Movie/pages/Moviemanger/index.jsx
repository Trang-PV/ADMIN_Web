import React, { Fragment, useEffect } from "react";
import { Table } from "antd";
import { EditOutlined, CreditCardOutlined, DeleteOutlined } from "@ant-design/icons";
import Search from "antd/lib/input/Search";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieDetelAction, fetchMoviesAction } from "../../action";
import { NavLink } from "react-router-dom";
import { fetchProfileAction } from "../../../authencation/action";
import { useMemo } from "react";
import style from './style.module.css'


function Moviemanger() {
  const dispatch = useDispatch();
  const onSearch = (value) => {
    dispatch(fetchMoviesAction(value));
  };
  const deleted=(value)=>{
    dispatch(fetchMovieDetelAction(value));
    dispatch(fetchMoviesAction());
  }
  const columns = [
    {
      title: "MÃ PHIM",
      dataIndex: "maPhim",
    },
    {
      title: "TÊN PHIM",
      dataIndex: "tenPhim",
      defaultSortOrder: "descend",
      render: (text, film) => {
        return (
          <Fragment>
        <p style={{margin:'auto',fontSize:'17px',fontWeight:'600',color:'blueviolet'}}>  {film.tenPhim} </p>
          </Fragment>
        );  
      },
    },
    {
      title: "HÌNH ẢNH",
      dataIndex: "hinhAnh",
      render: (text, film) => {
        return (
          <Fragment>
            <img
              key={3}
              src={film.hinhAnh}
              alt={film.tenPhim}
              width={60}
              height={60}
              style={{borderRadius:'50%'}}
            ></img>
          </Fragment>
        );
      },
    },
    { 
      title: "MÔ TẢ",
      dataIndex: "moTa",
      defaultSortOrder: "descend",
      render: (text, film) => {
        return (
          <Fragment>
            {film.moTa.length>50 ? film.moTa.substr(0,90)+'...' : film.moTa}
          </Fragment>
        );  
      },
    },
    {
      title: "HÀNH ĐỘNG",
      dataIndex: "tenPhim",
      defaultSortOrder: "descend",
      render: (text, film) => {
        return (
          <Fragment>
            <div>
              <NavLink className={style.css} style={{marginRight:"20px",fontSize:"25px"}} key={2} to={`/FilmEdit/${film.maPhim}`}>
                <EditOutlined />
              </NavLink>
              <NavLink className={style.css} style={{marginRight:"20px",fontSize:"25px"}} key={5} to={`/ShowTime/${film.maPhim}`}>
                <CreditCardOutlined />{" "}
              </NavLink>
              <DeleteOutlined className={style.css} style={{fontSize:"25px"}} onClick={()=>{deleted(film.maPhim)}} />
            </div>
          </Fragment>
        );
      },
    },

    ,
  ];
  const data = useSelector((state) => state.movie.movies);

  //

  useEffect(() => {
    dispatch(fetchMoviesAction());
    dispatch(fetchProfileAction);
  },[]);
  useEffect(() => {
    // dispatch(fetchMoviesAction());
   
  },data);
  
  const onChange = (pagination, filters, sorter, extra) => {
   
  };

  return (
    <div>
      <h2 style={{textAlign:'center',fontSize:"30px",fontWeight:'700',marginTop:'20px',color:'blueviolet',fontFamily:'monospace'}}>DANH SÁCH PHIM</h2>
      <Search style={{margin:"20px",width:"800px"}}
        placeholder="input search text"
        onSearch={onSearch}
        key={4}
        enterButton
      />
      <Table style={{margin:"20px"}} columns={columns} dataSource={data} onChange={onChange} key={1} />
    </div>
  );
}

export default Moviemanger;
