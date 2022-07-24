import { React } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Layout, Row, Col } from "antd";

import Header from "../components/header";
import Footer from "../components/footer";
import CaseShowIndex from "./caseShowIndex";
import ViewCase from "./viewCase";
import PublishCase from "./publishCase";
import EditCase from "./editCase";

function CaseShow() {
  return (
    <Layout className="homeContainer">
      <Layout.Content>
        <Header />
      </Layout.Content>
      <Row>
        <Col span={1}></Col>
        <Col span={22}>
          <Switch>
            <Route
              path="/caseShow"
              exact
              render={() => <Redirect to="/caseShow/index" />}
            />
            <Route path="/caseShow/index" component={CaseShowIndex} />
            <Route path="/caseShow/viewCase" component={ViewCase} />
            <Route path="/caseShow/publishCase" component={PublishCase} />
            <Route path="/caseShow/editCase" component={EditCase} />
          </Switch>
        </Col>
      </Row>

      <Layout.Footer justify="space-around" align="middle">
        <Footer />
      </Layout.Footer>
    </Layout>
  );
}

export default CaseShow;
