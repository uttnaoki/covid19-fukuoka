type DataType = {
  日付: Date
  小計: number
}

type GraphDataType = {
  items: string[]
  labels: string[]
  cumulative: number[][]
}

export default (data: DataType[]) => {
  const graphData: GraphDataType = {
    items:[],
    labels:[],
    cumulative: [[],[],[]]
  }
  graphData.items = ['福岡市', '北九州市', 'その他']
  const today = new Date()
  let patSum = 0
  data
    .filter(d => new Date(d['日付']) < today)
    .forEach(d => {
      const date = new Date(d['日付'])
      const subTotal = d['小計']
      graphData.labels.push(`${date.getMonth() + 1}/${date.getDate()}`)
      if (!isNaN(subTotal)) {
        patSum += subTotal
      }

      graphData.cumulative[0].push(subTotal) // 福岡市
      graphData.cumulative[1].push(subTotal) // 北九州市
      graphData.cumulative[2].push(subTotal) // その他
    })
  
  return graphData
}
