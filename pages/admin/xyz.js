import React from "react";
import { useRouter } from "next/router";
import { useStateContext } from "../../context/stateContext";
import ProductAdmin from "../../components/ProductAdmin";
import OrdersAdmiin from "../../components/OrdersAdmiin";
import SettingAdmin from "../../components/SettingAdmin";
import SalesAdmin from "../../components/SalesAdmin";
import { Button } from "react-bootstrap";

function xyz() {
  const router = useRouter();
  const { isLogin, Token, handleLogout, setTrigger } = useStateContext();
  const token = Token();

  const [active, setActive] = React.useState("products");
  const [sideBarBtn, setSideBarBtn] = React.useState({
    products: true,
    orders: false,
    sales: false,
    setting: false,
  });

  const handleActive = (active) => {
    const getNotActive = sideBarChecks.filter(
      (item) => item.name.toLocaleLowerCase() != active
    );
    const getActive = sideBarChecks.filter(
      (item) => item.name.toLocaleLowerCase() === active
    );
    const mapGetActive = getActive.map((item) => {
      return {
        [item.name.toLocaleLowerCase()]: true,
      };
    });
    const mapNotActive = getNotActive.map((item) => {
      return {
        [item.name.toLocaleLowerCase()]: false,
      };
    });
    const combine = [...mapNotActive, { ...mapGetActive[0] }];
    const getKey = combine.map((item, i) => {
      const key = Object.keys(item)[0];
      return {
        key: key,
        value: item[key],
      };
    });
    var object = getKey.reduce(
      (obj, item) => Object.assign(obj, { [item.key]: item.value }),
      {}
    );
    setSideBarBtn(object);
  };

  const sideBarChecks = [
    {
      name: "Products",
      icon: "/product.png",
      style: sideBarBtn?.products,
    },
    {
      name: "Orders",
      icon: "/order.png",
      style: sideBarBtn?.orders,
    },
    {
      name: "Sales",
      icon: "/sales.png",
      style: sideBarBtn?.sales,
    },
    {
      name: "Setting",
      icon: "/setting.png",
      style: sideBarBtn?.setting,
    },
  ];

  React.useEffect(() => {
    token === null ? router.replace("/admin/login") : null;
    handleActive(active);
  }, [active]);

  return (
    <div className="flexBs">
      <div className="sideBar">
        <h5 className="color-primary">Admin Panel</h5>
        <div className="border-bottom my-4"></div>
        {sideBarChecks.map((item) => (
          <div className="flexBs mt-1 align-items-center" key={item?.name}>
            <Button
              className={`color-primary-button ${
                item?.style ? "sideBarActive" : ""
              }`}
              variant="contain"
              onClick={() => setActive(item?.name.toLowerCase())}
            >
              <img
                src={item?.icon || ""}
                className={`${
                  item?.style ? "icon-sidebarActive" : "icon-sidebar"
                }`}
              />
              {item?.name}
            </Button>
          </div>
        ))}
        <div className="mt-5">
          <Button
            className={`color-primary-button `}
            variant="contain"
            onClick={() => {
                handleLogout()
                setTrigger(true)
                router.reload(window.location.pathname)
            }}
          >
            <img src="/logout.png" className="icon-sidebar" />
            Logout
          </Button>
        </div>
      </div>
      <div className="admin-content">
        {active === "products" ? <ProductAdmin /> : <></>}
        {active === "orders" ? <OrdersAdmiin /> : <></>}
        {active === "sales" ? <SalesAdmin />: <></>} 
        {active === "setting" ? <SettingAdmin />:<></>}
      </div>
    </div>
  );
}

export default xyz;
