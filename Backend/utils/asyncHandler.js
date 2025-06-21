// const asyncHandler= (func) => async(req,res,next)=>{
//   try {
//     return await func(req,res,next)
//   } catch (error) {
//     console.log(error);
//   }
// }

// export {asyncHandler}

const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
      Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err))
  }
}


export { asyncHandler }
