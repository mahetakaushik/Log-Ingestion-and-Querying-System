export const successResponse = (res: any, data: any, statusCode = 200) => {
  return res.status(statusCode).json({ success: true, data });
};

export const errorResponse = (res: any, data: any, statusCode = 400) => {
  return res.status(statusCode).json({ success: false, errors:data });
};
