import { Request } from "express"

import { User } from "../../models/user"

import { IResponseData } from "../../types/IResponses"

export async function getUsersProfilesService(req: Request): Promise<IResponseData> {
  const users_id = req.query.users_id

  // _id[]=s76fds97asgq&_id[]=s76fds9asdhy&_id[]=s76fds9asdhy&_id[]=s76fds9asdhy&_id[]=s76fds9asdhy&_id[]=s76fds9asdhy

  //É a função abaixo quue ira gerar a querystring no frontend
  /* 
  const arr = ["a", "b", "c", "d", "e", "f"]

  let query = ""

  arr.forEach((item, index, array) => {
    if(item) {
      if((index + 1) == array.length) {
        query += `_id[]=${item}`
        return
      }
  
      query += `_id[]=${item}&`
    }
  }) 
  */

  try {
    const profilesArray = await User.find({ _id: users_id })

    return {
      status: 200,
      data: {
        profilesArray: profilesArray
      }
    }
  } catch (error) {
    return {
      status: 400,
      data: {
        message: "Error on get users profile service"
      }
    }
  }
}