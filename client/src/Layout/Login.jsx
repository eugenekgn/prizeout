import '../styles/login.css'
import React, { useState, useEffect } from 'react';
import * as api from '../api'
import { Button, Modal, Form, Input, Select } from 'antd';
const { Option } = Select;

const LogIn = ({ visible, onLogIn, onCancel }) => {
    const [form] = Form.useForm();
    const [currencyCodes, setCurrencyCodes] = useState([]);

    useEffect(async () => {
        const data = await api.getCurrencyCodes()
        setCurrencyCodes(data.currencyCodes);
    }, []);

    return (
        <Modal
            visible={visible}
            title="Log In"
            onCancel={onCancel}
            centered={true}
            onOk={() => {
                form
                    .validateFields()
                    .then(values => {
                        //form.resetFields();
                        onLogIn(values);
                    })
                    .catch(info => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{
                    email: '',
                    currencyCode: ''
                }}
            >

                <Form.Item name={'email'}
                    label="Email"
                    hasFeedback
                    rules={[{
                        type: 'email',
                        required: true,
                        message: 'Please type in valid email'
                    }]}>
                    <Input />
                </Form.Item>

                <Form.Item
                    name="currencyCode"
                    label="Currency"
                    hasFeedback
                    rules={[{ required: true, message: 'Please select your country!' }]}
                >
                    <Select placeholder="Please select a country">
                        {!!currencyCodes && currencyCodes.map((curr) => <Option key={curr} value={curr}>{curr.toUpperCase()}</Option>)}
                    </Select>
                </Form.Item>
            </Form>
        </Modal >
    );
};

export default LogIn

