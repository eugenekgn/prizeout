import React from 'react';
import 'antd/dist/antd.css';
import '../styles/css.css';
import {
    Button,
    List,
    Card,
    Col,
    Row,
    InputNumber,
    Select
} from 'antd'


const { Option } = Select;


const gridOptions = {
    gutter: 16,
    xs: 6,
    sm: 6,
    md: 6,
    lg: 6,
    xl: 6,
    xxl: 10,
}

const css = {
    card: { paddingTop: 50, maxWidth: 200 },
    inputNumber: { margin: '0 2px' }
}

class BrandsGrid extends React.Component {

    state = {
        inputValue: 0
    }

    showMore = (brand) => {
        //TODO: replace this will modal or expand each cart
        alert(JSON.stringify(brand, null, 2))
    }

    render() {

        const { balanceInCents, currencyCode, data, inputValue } = this.props

        return (
            <List

                grid={gridOptions}
                pagination={{
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 50,
                }}
                dataSource={data}
                renderItem={brand => (

                    <List.Item>
                        <Card title={brand.name} bordered={true} style={css.card}
                        >
                            <img
                                width="100%"
                                alt={brand.brand_code}
                                src={brand.image_url}
                                style={{ marginBottom: 32 }}
                            />

                            {brand.max_price_in_cents &&
                                <Row>
                                    <Col>
                                        <InputNumber
                                            size="small"
                                            min={brand.min_price_in_cents}
                                            max={brand.max_price_in_cents}
                                            style={css.inputNumber}
                                            value={brand.min_price_in_cents}
                                            precision={2}
                                            onChange={this.onChange}
                                        />

                                        <Button size="small">Buy</Button>
                                        <Button size="small" onClick={() => this.showMore(brand)}>More</Button>
                                    </Col>
                                </Row>
                            }
                            {brand.allowed_prices_in_cents &&
                                <Row>
                                    <Col>
                                        <Select defaultValue={brand.allowed_prices_in_cents[0]} size={'small'}>
                                            {brand.allowed_prices_in_cents &&
                                                brand.allowed_prices_in_cents.map(m => <Option value={m}>{currencyCode} {m}</Option>)
                                            }
                                        </Select>
                                        <Button size="small">Buy</Button>
                                        <Button size="small" onClick={() => this.showMore(brand)}>More</Button>
                                    </Col>
                                </Row>
                            }


                        </Card>
                    </List.Item>

                )}>

            </List>

        )
    }
}
export default BrandsGrid;




