import React from 'react';
import * as api from '../api'
import BrandGrid from '../Components/BrandsGrid'

import 'antd/dist/antd.css';
import '../styles/css.css';
import {
    Layout,
    Typography,
    Select
} from 'antd'
import LogIn from './Login';

const { Text } = Typography;
const { Header, Content, Footer } = Layout;

const logoInfo = {
    className: "logo",
    src: "https://static.prizeout.com/Prizeout%20Consumer%20-%20Deep%20Blue.png",
    width: "100",
    alt: "Prizeout",
    itemProp: "logo"
}

const css = {
    content: { padding: '0 50px' }
}

class Main extends React.Component {

    state = {
        balanceInCents: null,
        currencyCode: null,
        email: null,
        openLogIn: true,
        brands: [],
        inputValue: 0
    }

    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    onFinish = values => {
        console.log('Success:', values);
    };

    onLogIn = async ({ email, currencyCode }) => {

        const userBalance = await api.getUserBalance(email, currencyCode)
        this.setState({
            openLogIn: !this.state.openLogIn,
            ...userBalance
        })

        //rename to selected currencyCode to avoid ambiguity
        const brands = await api.getGiftcardBrands(currencyCode)

        this.setState({
            brands
        })
    }


    render() {

        const { openLogIn, balanceInCents, currencyCode, email, brands } = this.state
        const hasBrands = brands.length > 0

        return (
            <Layout className="layout" style={{ height: '100%' }}>
                <Header className="header">
                    <div>
                        <img {...logoInfo} />
                    </div>
                </Header>

                <Content style={css.content}>
                    {!openLogIn && <Text type="secondary">Email {email} | Currency: {currencyCode} | Available Balance: ${balanceInCents / 100}.00 </Text>}
                    <LogIn visible={openLogIn} onLogIn={this.onLogIn} />
                    {hasBrands && <BrandGrid
                        data={brands}
                        balanceInCents={balanceInCents}
                        currencyCode={currencyCode}
                    />}


                </Content>
                <Footer style={{ textAlign: 'center' }}> Prizeout Coding Challenge </Footer>
            </Layout >
        );
    }
}

export default Main;

