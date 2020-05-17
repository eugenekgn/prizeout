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
    inputNumber: { margin: '0 2px' },
    helperText: {
        fontSize: 11,
        fontWeight: 'bold',
        color: 'gray'
    }
}

class BrandsGrid extends React.PureComponent {

    state = {
        inputValue: 0
    }

    showMore = (brand) => {
        //TODO: replace this will modal or expand each cart
        alert(JSON.stringify(brand, null, 2))
    }

    onChange = (index, newValue) => {

        this.props.changeValueOfBrand(index, newValue)
    }

    render() {

        const { currencyCode, brands, onSelectBrand, disableAdding } = this.props
        return (
            <List
                style={{ marginTop: 32 }}
                grid={gridOptions}
                pagination={{
                    onChange: page => {
                        // console.log(page);
                    },
                    pageSize: 50,
                }}
                dataSource={brands}
                renderItem={(brand, index) => (

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
                                        <span style={css.helperText}>{brand.currency_code} min {brand.min_price_in_cents / 100}.00 - max {brand.max_price_in_cents / 100}</span>
                                        <InputNumber
                                            size="small"
                                            min={brand.min_price_in_cents / 100} //hack
                                            max={brand.max_price_in_cents / 100} //hack
                                            style={css.inputNumber}
                                            value={brand.currentValue}
                                            precision={2}
                                            onChange={(value) => this.onChange(index, value)} //bit of a hack
                                        />

                                        <Button size="small" disabled={disableAdding} onClick={() => onSelectBrand(brand)}>Add</Button>
                                        <Button size="small" onClick={() => this.showMore(brand)}>More</Button>
                                    </Col>
                                </Row>
                            }
                            {brand.allowed_prices_in_cents &&
                                <Row>
                                    <Col>
                                        <br />
                                        <Select defaultValue={brand.currentValue} size={'small'} onChange={(value) => this.onChange(index, value)} >
                                            {brand.allowed_prices_in_cents &&
                                                brand.allowed_prices_in_cents.map(m => <Option key={`brand-${m}`} value={m}>{currencyCode} {m}</Option>)
                                            }
                                        </Select>
                                        <Button size="small" disabled={disableAdding} onClick={() => onSelectBrand(brand)} >Add</Button>
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




