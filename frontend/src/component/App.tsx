import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import _ from 'lodash'
import { Spin, Button, notification } from 'antd'
import { LoadState } from '../store/index'
import { setLoading } from '../actions'
import Sudoku from './Sudoku'
import 'antd/dist/antd.css'
import './App.css'

export interface AppProps {
  loading: boolean
  setLoading: (loading: boolean) => {}
}

interface SelectedType {
  index: number
  value: number
}

const App: React.FunctionComponent<AppProps> = props => {
  const [selected, setSelected] = useState<Array<SelectedType>>([])
  const [puzzleArray, setPuzzleArray] = useState<Array<number>>(_.fill(Array(81), 0))

  function getSudoku() {
    props.setLoading(true)
    axios
      .get('/sudoku/board')
      .then(res => {
        setPuzzleArray(res.data)
        props.setLoading(false)
      })
      .catch(() => {
        notification.error({
          message: "Can't load the sudoku board, please try later!",
        })
      })
  }

  useEffect(() => {
    /* get initial board here */
    getSudoku()
  }, [])

  function onChange(i: number, value: number) {
    let newSelected = [...selected]
    const existIndex = newSelected.findIndex(e => e.index === i)
    if (existIndex !== -1) {
      newSelected = newSelected.filter(e => e.index !== i)
    } else {
      newSelected.push({ index: Number(i), value: Number(value) })
    }
    setSelected(newSelected)
  }

  function onRequest() {
    if (selected.length > 0) {
      const emptyArray = _.fill(Array(81), 0)
      selected.forEach(e => {
        emptyArray[e.index] = e.value
      })
      axios
        .post('/sudoku/board', {
          num: emptyArray,
        })
        .then(res => {
          setPuzzleArray(res.data)
        })
        .catch(() => {
          notification.error({
            message: "Can't load the sudoku board, please try later!",
          })
        })
    } else {
      getSudoku()
    }
  }

  return (
    <Spin spinning={props.loading} wrapperClassName="board-container">
      <h1>Sudoku Board</h1>
      <Sudoku puzzleArray={puzzleArray} onChange={onChange} selected={selected} />
      <div className="button-wrapper">
        <Button type="primary" size="large" onClick={onRequest}>
          Reload
        </Button>
      </div>
    </Spin>
  )
}

const mapStateToProps = (state: LoadState) => ({
  loading: state.loading,
})

const mapDispatchToProps = {
  setLoading,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
