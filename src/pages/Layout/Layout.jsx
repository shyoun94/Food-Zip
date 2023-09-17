import React from "react";
import Header from "../../components/common/Header/Header";
import Navigation from "../../components/common/Nav/Navigation";
import NavigationPC from "../../components/common/Nav/NavigationPC";
import { Outlet } from "react-router-dom";

function LayoutMobile() {
  return (
    <>
      <Header />
      <Outlet />
      <Navigation />
    </>
  );
}

function LayoutPC() {
  return (
    <>
      <Outlet />
      <NavigationPC />
    </>
  );
}

export { LayoutMobile, LayoutPC };
