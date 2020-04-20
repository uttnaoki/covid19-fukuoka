const headers = [
  { text: '居住地', value: '居住地' },
  { text: '陽性患者数', value: '陽性患者数' }
]

type DataType = {
  リリース日: Date
  居住地: string | ' '
  年代: string | null
  性別: '男性' | '女性'
  退院: '◯' | null
  [key: string]: any
}

type TableDataType = {
  居住地: DataType['居住地']
  陽性患者数: number
}

type TableMunicipalitiesType = {
  headers: typeof headers
  datasets: TableDataType[]
}

export default (data: DataType[]) => {
  const tableMunicipalities: TableMunicipalitiesType = {
    headers,
    datasets: []
  }

  tableMunicipalities.datasets.push(
    {
      '居住地': '福岡市',
      '陽性患者数': 0
    },
    {
      '居住地': '北九州市',
      '陽性患者数': 0
    },
    {
      '居住地': '福岡県（それ以外）',
      '陽性患者数': 0
    }
  )
  
  let municipalities: { [key: string]: number; } = {};
  data.forEach(d => {

    if (d['居住地'] in municipalities) {
      municipalities[d['居住地']] = municipalities[d['居住地']] + 1
    } else {
      municipalities[d['居住地']] = 1;
    }
    if (d['居住地'].indexOf('福岡市') > -1) {
      tableMunicipalities.datasets[0]['陽性患者数'] += 1;
    } else if (d['居住地'].indexOf('北九州市') > -1) {
      tableMunicipalities.datasets[1]['陽性患者数'] += 1;
    } else {
      tableMunicipalities.datasets[2]['陽性患者数'] += 1;
    }

  })

  return tableMunicipalities
}
