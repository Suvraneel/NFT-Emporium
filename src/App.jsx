import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect,
} from "react-router-dom";
import Account from "components/Account";
import Chains from "components/Chains";
import TokenPrice from "components/TokenPrice";
import ERC20Balance from "components/ERC20Balance";
import InchDex from "components/InchDex";
import NFTBalance from "components/NFTBalance";
import Wallet from "components/Wallet";
import { Menu, Layout } from "antd";
import "antd/dist/antd.css";
import NativeBalance from "components/NativeBalance";
import "./style.css";
import QuickStart from "components/QuickStart";
import Contract from "components/Contract/Contract";
import Text from "antd/lib/typography/Text";
import Background from "components/diabloBG.jpg"
import CreateNFT from "components/CreateNFT/CreateNFT";
import Forge from "components/Forge/Forge";
import { ReactComponent as Logo } from './nftLogo.svg';
const { Header, Footer } = Layout;

const styles = {
  content: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "Playfair Display, sans-serif",
    color: "#001529",
    marginTop: "130px",
    padding: "10px",
  },
  header: {
    position: "fixed",
    zIndex: 1,
    width: "100%",
    background: "#001529",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "Playfair Display, Raleway, sans-serif",
    borderBottom: "2px solid rgba(0, 0, 0, 0.06)",
    padding: "0 10px",
    boxShadow: "0 1px 10px rgb(151 164 175 / 10%)",
  },
  headerRight: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    fontSize: "15px",
    fontWeight: "600",
  },
};
const App = ({ isServerInfo }) => {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } =
    useMoralis();

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  return (
    <Layout style={{ height: "100vh", overflow: "auto", backgroundImage: `url(${Background}`, backgroundSize: 'cover'}}>
      <Router>
        <Header style={styles.header}>
          <Logo />
          <Menu
            theme="dark"
            mode="horizontal"
            style={{
              display: "flex",
              fontSize: "17px",
              fontWeight: "500",
              width: "100%",
              justifyContent: "center",
            }}
            defaultSelectedKeys={["wallet"]}
          >
            {/* <Menu.Item key="quickstart">
              <NavLink to="/quickstart">🚀 Quick Start</NavLink>
            </Menu.Item> */}
            <Menu.Item key="wallet">
              <NavLink to="/wallet">💳 Wallet</NavLink>
            </Menu.Item>
            <Menu.Item key="dex">
              <NavLink to="/1inch">💱 Dex</NavLink>
            </Menu.Item>
            {/* <Menu.Item key="balances">
              <NavLink to="/erc20balance">🪙 Balances</NavLink>
            </Menu.Item>
            <Menu.Item key="transfers">
              <NavLink to="/erc20transfers">💸 Transfers</NavLink>
            </Menu.Item> */}
            <Menu.Item key="nft">
              <NavLink to="/nftBalance">🖼 NFTs</NavLink>
            </Menu.Item>
            {/* <Menu.Item key="contract">
              <NavLink to="/contract">📜 Contract</NavLink>
            </Menu.Item> */}
            <Menu.Item key="createNFT">
              <NavLink to="/createNFT">🖋️ Create NFT</NavLink>
            </Menu.Item>
            <Menu.Item key="Forge">
              <NavLink to="/Forge">🖋️ Forge</NavLink>
            </Menu.Item>
          </Menu>
          <div style={styles.headerRight}>
            <Chains />
            {/* <TokenPrice
              address="0x1f9840a85d5af5bf1d1762f925bdaddc4201f984"
              chain="eth"
              image="https://cloudflare-ipfs.com/ipfs/QmXttGpZrECX5qCyXbBQiqgQNytVGeZW5Anewvh2jc4psg/"
              size="40px"
            /> */}
            <NativeBalance />
            <Account />
          </div>
        </Header>
        <div style={styles.content}>
          <Switch>
            {/* <Route path="/quickstart">
              <QuickStart isServerInfo={isServerInfo} />
            </Route> */}
            <Route path="/wallet">
              <Wallet />
            </Route>
            <Route path="/1inch">
              <InchDex chain="eth" />
            </Route>
            {/* <Route path="/erc20balance">
              <ERC20Balance />
            </Route>
            <Route path="/erc20transfers">
              <ERC20Transfers />
            </Route> */}
            <Route path="/nftBalance">
              <NFTBalance />
            </Route>
            {/* <Route path="/contract">
              <Contract />
            </Route> */}
            <Route path="/createNFT">
              <CreateNFT />
            </Route>
            <Route path="/Forge">
              <Forge />
            </Route>
            <Route path="/nonauthenticated">
              <>Please login using the "Authenticate" button</>
            </Route>
          </Switch>
          <Redirect to="/wallet" />
        </div>
      </Router>
    </Layout>
  );
};

export default App;
