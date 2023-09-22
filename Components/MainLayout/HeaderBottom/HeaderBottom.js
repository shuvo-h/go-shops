import React, { useState } from "react";
import { mainNavItems } from "../../../DataSetStatic/common/navData";
import mainLayoutST from "../mainLayout.module.css";
import NavBottomCategory from "./NavBottomCategory";
import NavLink from "next/link";
import { useRouter } from "next/router";

const HeaderBottom = () => {
  const router = useRouter();
  const [showButton, setShowButton] = useState(true);
  const { deal, track } = mainNavItems;
  // console.log(router.pathname);
  return (
    <div
    className={`baseContainer centerEL ${mainLayoutST.headerBTM_ct_parent_wrapper}`}
  >
    <NavBottomCategory></NavBottomCategory>
    <div className={mainLayoutST.headerBottomNav_links}>
 
      <label style={{display:'none'}} htmlFor="" onClick={() => setShowButton(!showButton)}>
        menu
      </label>

      <nav>
      {showButton ? (
        <ul className={mainLayoutST.headerBottomNav_links_list}>
          {mainNavItems.mainnavLinks.map((link) => (
            <li key={link.path}>
              <NavLink href={link.path}>
                <a
                  className={
                    router.pathname === link.path
                      ? mainLayoutST.active_link
                      : ""
                  }
                >
                  {link.title}
                </a>
              </NavLink>
            </li>
          ))}
        </ul>
      ) : (
        ""
      )}
      </nav>
    </div>
    <div>
      <ul className={mainLayoutST.headerBottomNav_links_list}>
        <li>
          <NavLink href={track.path}>
            <a>{track.title}</a>
          </NavLink>
        </li>
        <li>
          <NavLink href={deal.path}>
            <a>{deal.title}</a>
          </NavLink>
        </li>
      </ul>
    </div>
   </div>
  );
};

export default HeaderBottom;

{
  /*
<div
      className={`baseContainer centerEL ${mainLayoutST.headerBTM_ct_parent_wrapper}`}
    >
      <NavBottomCategory></NavBottomCategory>
      <div className={mainLayoutST.headerBottomNav_links}>
        <input type="checkbox"  />
        <label htmlFor="" onClick={() => setShowButton(!showButton)}>
          menu
        </label>

        <nav>
        {showButton ? (
          <ul className={mainLayoutST.headerBottomNav_links_list}>
            {mainNavItems.mainnavLinks.map((link) => (
              <li key={link.path}>
                <NavLink href={link.path}>
                  <a
                    className={
                      router.pathname === link.path
                        ? mainLayoutST.active_link
                        : ""
                    }
                  >
                    {link.title}
                  </a>
                </NavLink>
              </li>
            ))}
          </ul>
        ) : (
          ""
        )}
        </nav>
      </div>
      <div>
        <ul className={mainLayoutST.headerBottomNav_links_list}>
          <li>
            <NavLink href={track.path}>
              <a>{track.title}</a>
            </NavLink>
          </li>
          <li>
            <NavLink href={deal.path}>
              <a>{deal.title}</a>
            </NavLink>
          </li>
        </ul>
      </div>
     </div> */
}
