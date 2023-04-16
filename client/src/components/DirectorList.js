import React, { useEffect, useState } from 'react'
import { Card, Pagination } from 'antd'
import axios from 'axios'

const config = require('../config.json')

const { Meta } = Card

const DirectorList = () => {

  const [directors, setDirectors] = useState([])
  const [totalDirectors, setTotalDirectors] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [directorsPerPage, setDirectorsPerPage] = useState(20)

  useEffect(() => {
    const offset = (currentPage - 1) * directorsPerPage
    axios.get(`http://${config.server_host}:${config.server_port}/alldirectors?limit=${directorsPerPage}&offset=${offset}`)
      .then((response) => {
        console.log(response.data.total)
        setDirectors(response.data.directors)
        setTotalDirectors(response.data.total)
      }).catch((error) => {
        console.log(error)
      })
  }, [currentPage, directorsPerPage])

  useEffect(() => {
    setCurrentPage(1)
  }, [directorsPerPage])

  const handleDirectorsPerPageChange = (currentPage, size) => {
    setCurrentPage(1)
    setDirectorsPerPage(size)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {directors.map((director) => (
          <Card
            key={director.id}
            hoverable
            style={{ width: 300, margin: '10px' }}
            cover={<img alt="director poster" src={director.photo_url ? director.photo_url : 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png'} />}
          >
            <Meta title={director.name} />
            <br />
            <p>
              <strong>Birth date:</strong> {director.birth_date ? director.birth_date.match(/^\d{4}-\d{2}-\d{2}/)[0] : "we don't know"}
            </p>
            <p>
              <strong>He/She also worked in/as:</strong> {director.profession.replace(/,director|director,/g, '').split(',').map((item) => item.trim()).join(' | ')}
            </p>
          </Card>
        ))}
      </div>
      <Pagination
        current={currentPage}
        pageSize={directorsPerPage}
        pageSizeOptions={[20, 50, 100]}
        total={totalDirectors}
        onChange={handlePageChange}
        onShowSizeChange={handleDirectorsPerPageChange}
        style={{ marginTop: '20px', textAlign: 'center' }}
      />
    </>
  )
}

export default DirectorList