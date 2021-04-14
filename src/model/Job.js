let data = [

  {
    id: 1,
    name: 'Pizzaria Master pão',
    'daily-hours': 5,
    'total-hours': 100,
    created_at: Date.now(),


  },
  {
    id: 2,
    name: ' pão master pizza',
    'daily-hours': 3,
    'total-hours': 47,
    created_at: Date.now(),

  }

]

module.exports = {
  get(){
    return data
  },
  update(newJob){
    data = newJob
  },
  delete(id){
    data = data.filter(job => Number(job.id) !== Number(id))
  }
}