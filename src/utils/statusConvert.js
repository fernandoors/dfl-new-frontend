export const statusContent = {
  'closed': 'Fechado',
  'in_progress': 'Em Progresso',
  'cancelled': 'Cancelado',
  'opened': 'Aberto',
}

export const statusToColor = {
  'closed': 'orange',
  'in_progress': 'blue',
  'cancelled': 'red',
  'opened': 'green',
}

export const statusArrayObject = Object.entries(statusContent).map(content => (
  { key: content[0], value: content[0], text: content[1], color: statusToColor[content[0]] }
))