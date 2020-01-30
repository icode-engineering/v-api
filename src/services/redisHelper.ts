export default class RedisHelper {
  private client

  constructor(client) {
    this.client = client
  }

  public get(id: number) {
    return new Promise((resolve, reject) => {
      this.client.hgetall(id, (err, obj) => {
        if (err) {
          reject(err)
        }
        resolve(obj)
      })
    })
  }

  public set(id: number, params: any, expire: string) {
    return new Promise((resolve, reject) => {
      const stringedId = id.toString()
      this.client.hmset(stringedId, params, (err, reply) => {
        if (expire) {
          this.client.expire(stringedId, expire)
        }
        if (err) {
          return reject(err)
        }
      })
      resolve()
    })
  }
}
