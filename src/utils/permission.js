/* 角色对应路由关系 */
const roleToRouter = {
  coustomer: [
    {
      name: "Product"
    },
    {
      name: "goodList"
    },
    {
      name: "goodAdd"
    }
  ],
  admin: [
    {
      name: "Product"
    },
    {
      name: "goodList"
    },
    {
      name: "goodAdd"
    },
    {
      name: "cateGory"
    }
  ]
};

/* 返回一个最终要渲染到页面的路由 */
export default function getMenuRoute(role, routes) {
  const allowRoutesName = roleToRouter[role].map(ele => ele.name);

  const resultRoutes = routes.filter(ele => {
    if (allowRoutesName.includes(ele.name)) {
      ele.children = ele.children.filter(d => {
        if (allowRoutesName.includes(d.name)) {
          return d;
        }
      });
      return true;
    }
    return false;
  });
  return resultRoutes;
}
