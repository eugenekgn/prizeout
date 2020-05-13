import React from 'react';
import * as api from '../api'
import BrandGrid from '../Components/BrandsGrid'

import 'antd/dist/antd.css';
import '../styles/css.css';
import {
    Layout,
    Typography,
    Spin
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
        inputValue: 0,
        isLoading: false,
        brandsSelected: []
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

        this.setState({
            isLoading: true
        })
        //rename to selected currencyCode to avoid ambiguity
        const brands = await api.getGiftcardBrands(currencyCode)

        this.setState({
            brands
        })
        this.setState({
            isLoading: false
        })
    }

    onSelectBrand = (brandItem) => {
        console.log(brandItem)
        this.setState({
            brandsSelected: [...this.state.brandsSelected, brandItem]
        })
    }
    render() {

        const { openLogIn, balanceInCents, currencyCode, email, brands, isLoading, brandsSelected } = this.state
        const hasBrands = brands.length > 0
        const canSelectMore = brandsSelected.length === 5

        return (
            <Layout className="layout" style={{ height: '100%' }}>
                <Header className="header">
                    <div>
                        <img {...logoInfo} />
                    </div>
                </Header>

                <Content style={css.content}>

                    {!openLogIn && <Text type="secondary">Email {email} | Currency: {currencyCode} | Available Balance: ${balanceInCents / 100}.00 | Items In Cart {brandsSelected.length} </Text>}
                    <LogIn visible={openLogIn} onLogIn={this.onLogIn} />
                    {isLoading &&
                        <div className="spinWrapper">
                            <Spin size="large" />
                        </div>
                    }
                    {hasBrands && <BrandGrid
                        data={brands}
                        balanceInCents={balanceInCents}
                        currencyCode={currencyCode}
                        onSelectBrand={this.onSelectBrand}
                        disableAdding={canSelectMore}
                    />}


                </Content>
                <Footer style={{ textAlign: 'center' }}> Prizeout Coding Challenge </Footer>
            </Layout >
        );
    }
}

export default Main;

