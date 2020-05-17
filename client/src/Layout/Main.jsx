import React from 'react';
import * as api from '../api'
import BrandGrid from '../Components/BrandsGrid'
import { InfoCircleOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css';
import '../styles/css.css';
import { ShoppingCartOutlined } from '@ant-design/icons'
import {
    Layout,
    Typography,
    Spin,
    Tooltip,
    notification,
    Button
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
        balance_in_cents: null,
        currencyCode: null,
        user: null,
        openLogIn: true,
        brands: [],
        inputValue: 0,
        isLoading: false,
        brandsSelected: [],

    }

    onLogIn = async ({ email, currencyCode }) => {

        const userBalance = await api.getUserBalance(email, currencyCode)
        console.log(userBalance)
        this.setState({
            openLogIn: !this.state.openLogIn,
            ...userBalance
        })

        this.setState({
            isLoading: true
        })

        //rename to selected currencyCode to avoid ambiguity
        let brands = await api.getGiftcardBrands(currencyCode)

        brands = brands.map(brand => {
            const modBrand = {
                ...brand,
                currentValue: brand.min_price_in_cents / 100 || brand.allowed_prices_in_cents[0] / 100 //hack
            }

            if (modBrand.allowed_prices_in_cents) {
                modBrand.allowed_prices_in_cents = modBrand.allowed_prices_in_cents.map(val => val / 100)
            }

            return modBrand
        })

        this.setState({
            brands
        })
        this.setState({
            isLoading: false
        })
    }

    onSelectBrand = (brandItem) => {
        const { balance_in_cents, currencyCode } = this.state
        const currentBlanceInDollars = balance_in_cents / 100
        if (brandItem.currentValue > currentBlanceInDollars) {
            notification['error']({
                message: 'Lack of funds!',
                description: `You're ${currencyCode} ${Math.abs(currentBlanceInDollars - brandItem.currentValue)}.00 short`
            });
            return;
        }
        this.setState({
            brandsSelected: [...this.state.brandsSelected, brandItem]
        })
    }

    changeValueOfBrand = (index, newValue) => {

        const { brands } = this.state
        const updatedBrand = Object.assign({}, brands[index], { currentValue: newValue });

        this.setState({
            brands: [
                ...brands.slice(0, index),
                updatedBrand,
                ...brands.slice(index + 1)
            ]
        });
    }

    purcahse = async () => {
        const { email, currencyCode, brandsSelected } = this.state
        const purchaseResponse = await api.purchase(email, currencyCode, brandsSelected);

        if (purchaseResponse.error) {
            notification['error']({
                message: 'Order Failure!',
                description: purchaseResponse.error,
            });
        } else {
            notification['success']({
                message: 'Order Success!',
                description: JSON.stringify(purchaseResponse, null, 2)
            });

            const userBalance = await api.getUserBalance(email, currencyCode)

            this.setState({
                brandsSelected: [],
                balance_in_cents: userBalance.balance_in_cents
            })

            notification['success']({
                message: 'New Balance',
                description: `${userBalance.currencyCode} ${userBalance.balance_in_cents / 100}.00`
            });
        }
    }

    getHeaderInfo = () => {
        const { balance_in_cents, currencyCode, email, brandsSelected } = this.state
        const showBuyItNowButton = brandsSelected.length > 0
        const tooltipText = brandsSelected.map(brand => `${brand.name} ${brand.currentValue}`).join(' | ') || "Nothing Selected!"

        const tooltipInfo = <Tooltip placement="bottom" title={tooltipText} arrowPointAtCenter>
            <InfoCircleOutlined />
        </Tooltip>


        return (<><b>Email:</b> {email} | <b>Currency:</b> {currencyCode} | <b>Available Balance:</b> ${ balance_in_cents / 100}.00 | <b>  Items In Cart {tooltipInfo} : </b> {brandsSelected.length}
            {showBuyItNowButton && <span>  | <Button type="primary" size="small" shape="round" icon={<ShoppingCartOutlined />} onClick={this.purcahse}>Buy</Button> </span>}  </>)
    }

    render() {

        const { openLogIn, balance_in_cents, currencyCode, brands, isLoading, brandsSelected } = this.state
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
                    {!openLogIn &&
                        <Text type="secondary"> {this.getHeaderInfo()} </Text>}
                    <LogIn visible={openLogIn} onLogIn={this.onLogIn} />
                    {isLoading &&
                        <div className="spinWrapper">
                            <Spin size="large" />
                        </div>
                    }
                    {hasBrands && <BrandGrid
                        brands={brands}
                        balanceInCents={balance_in_cents}
                        currencyCode={currencyCode}
                        onSelectBrand={this.onSelectBrand}
                        disableAdding={canSelectMore}
                        changeValueOfBrand={this.changeValueOfBrand}
                    />}


                </Content>
                <Footer style={{ textAlign: 'center' }}> Prizeout Coding Challenge </Footer>
            </Layout >
        );
    }
}

export default Main;

