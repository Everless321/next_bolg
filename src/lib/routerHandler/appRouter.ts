// 自定义路由处理，非Next.js路由，采用json结构体传入，会有一个参数为router代表请求方,需要根据请求方法调用对应方法
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const appRouter = async (data: any) => {
  const router = data.router;
  // 根据router的内容去调用方法，
  switch (router) {
    case "stats":
        console.log("stats")
      break;

    default:
        console.log("未找到对应的路由")
      break;
  }
};

export default appRouter;