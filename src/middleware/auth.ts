import jwt from "jsonwebtoken";

export const auth = (req: any, res: any, next: any) => {
  //TODO find types
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN, (err: any, user: any) => {
    if (err) return res.sendStatus(403);
    req.authUser = user;
    next();
  });
};
