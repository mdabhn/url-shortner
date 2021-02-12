import React, { useRef, useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
var shortUrl = require('node-url-shortener');

const Input = () => {
  const url = useRef();

  const [Urls, setUrls] = useState([]);
  const [show, setshow] = useState('hidden');

  const submitHandeler = (e) => {
    e.preventDefault();
    let fullurl = e.target.fullUrl.value;
    shortUrl.short(`${url.current.value}`, function (err, url) {
      setUrls([
        ...Urls,
        {
          fullURL: fullurl,
          shortURL: url,
        },
      ]);
    });
    setshow('');
    document.getElementById('fullUrl').value = '';
  };

  useEffect(() => {
    const local_datas = window.localStorage.getItem('short-urls-list');
    if (local_datas) {
      console.log(local_datas);
      setUrls(JSON.parse(local_datas));
      setshow('');
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('short-urls-list', JSON.stringify(Urls));
  }, [Urls]);

  return (
    <>
      <h1 className='text-center mt-2' style={{ color: 'white' }}>
        Let's Trim Your Link
      </h1>
      <div className='d-flex justify-content-center align-items-center mt-4'>
        <form onSubmit={submitHandeler}>
          <div
            className='row d-flex justify-content-center align-items-center'
            style={{ width: '50vw', height: '20vh' }}
          >
            <div className='col-lg-9'>
              <input
                type='url'
                name='fullUrl'
                id='fullUrl'
                className='form-control'
                ref={url}
                placeholder='paste your url here'
              />
            </div>
            <div className='col-lg-2 p-0'>
              <button type='submit' className='btn btn-primary'>
                Short It
              </button>
            </div>
          </div>
        </form>
      </div>

      <div
        className='d-flex justify-content-center align-items-center mt-4'
        style={{ visibility: `${show}` }}
      >
        <Table striped bordered hover variant='dark'>
          <thead>
            <tr>
              <th>Full URL</th>
              <th>Short URL</th>
            </tr>
          </thead>
          <tbody>
            {Urls.map((url, key) => (
              <tr key={key}>
                <td>{url.fullURL}</td>
                <td>
                  <a href={url.shortURL} rel='noreferrer' target='_blank'>
                    {url.shortURL}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default Input;
