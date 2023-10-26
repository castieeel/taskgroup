export interface iProduct {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: Rating
}

export interface Rating {
  rate: number
  count: number
}

export interface iLogin {
  username: string
  password: string
}

export interface iToken {
  token: string
}
