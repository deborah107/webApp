const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'myapp',
  password: 'keke1093',
  port: 5432,
})

const getUsers = (request, response) => {
  pool.query('SELECT * FROM public.account ORDER BY user_id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.user_id)

  pool.query('SELECT * FROM public.account WHERE user_id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
  const { fullname, email, password } = request.body
  console.log(request.body)

  pool.query('INSERT INTO public.account (fullname, email, password) VALUES ($1, $2, $3)', [fullname, email, password], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.insertId}`)
  })
}

const updateUser = (request, response) => {
  const id = parseInt(request.params.user_id)
  const { fullname, email, user_id } = request.body

  pool.query(
    'UPDATE public.account SET fullname = $1, email = $2 WHERE user_id = $3',
    [fullname, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.user_id)

  pool.query('DELETE FROM public.account WHERE user_id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

const login = (request, response) => {
  const { email, password } = request.body

  pool.query('SELECT email, password FROM account WHERE email = $1', [email], (error, results) => {
    if (error) {
      response.status(401).json(error)
      return
    }
    if (results.rows.length === 0) {
      response.status(404).json('not found')
      return
    }
    const user = results.rows[0]
    console.log(user)
    if (user.password !== password) {
      response.status(401).json('invalid password')
      return
    }
    response.status(200).json('OK')
  })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  login,
}