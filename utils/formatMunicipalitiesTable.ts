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
  
  let municipalities: { [key: string]: number; } = {};
  data.forEach(d => {

    if (d['居住地'] in municipalities) {
      municipalities[d['居住地']] = municipalities[d['居住地']] + 1
    } else {
      municipalities[d['居住地']] = 1;
    }
  })

  for (let key in municipalities) {
    tableMunicipalities.datasets.push({
      "居住地": key,
      "陽性患者数": municipalities[key]
    });
  }
  
  tableMunicipalities.datasets.sort((a, b) => (a === b ? 0 : a < b ? 1 : -1))
  return tableMunicipalities
}
