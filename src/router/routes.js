const routes = [
  {
    path: "/",
    component: () => import("layouts/IndexLayout")
  },
  {
    path: "/music",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "home",
        component: () => import("pages/home/Home"),
        children: [
          {
            path: "",
            redirect: "dis"
          },
          {
            path: "dis",
            component: () => import("pages/home/dis/dis"),
            children: [
              {
                path: "",
                redirect: "individuality"
              },
              {
                name: "searchResult",
                path: "searchResult/:keyword",
                component: () => import("pages/home/dis/children/searchResult")
              },
              {
                path: "individuality",
                component: () => import("pages/home/dis/children/individuality")
              },
              {
                path: "latest",
                component: () => import("pages/home/dis/children/latest")
              },
              {
                path: "rank",
                component: () => import("pages/home/dis/children/rank")
              },
              {
                path: "singer",
                component: () => import("pages/home/dis/children/singer")
              }
            ]
          },
          {
            name: "fm",
            path: "fm",
            component: () => import("pages/home/fm/fm")
          },
          {
            name: "dynamic",
            path: "dynamic",
            component: () => import("pages/home/dynamic/dynamic")
          },
          {
            path: "mine",
            component: () => import("pages/home/mine/mine"),
            children: [
              {
                path: "",
                redirect: "myself"
              },
              {
                name: "myself",
                path: "myself/:userId",
                component: () => import("pages/home/mine/children/myself")
              }
            ]
          },
          {
            name: "singerDetail",
            path: "singerDetail/:singerId",
            component: () => import("pages/home/singerDetail")
          },
          {
            name: "playlist",
            path: "playlist/:playlistId",
            component: () => import("pages/home/playlist")
          },
          {
            name: "mv",
            path: "mv/:mvId",
            component: () => import("pages/home/mv")
          }
        ]
      }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
