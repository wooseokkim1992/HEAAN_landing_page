import { middlewareChain } from "@/middlewares/middlewareChain";
import { routeMiddleware } from "@/middlewares/routeMiddleware";

export default middlewareChain([routeMiddleware]);
