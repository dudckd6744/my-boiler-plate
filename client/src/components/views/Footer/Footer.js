import React from 'react'
import { SmileOutlined} from '@ant-design/icons';

function Footer() {
    return (
        <div style={{
            display: 'flex', fontWeight:"bold",
            flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', fontSize:'1rem'
        }}>
        <p style={{height:"1px"}} > @Happy Coding  <SmileOutlined /></p>
        </div>
    )
}

export default Footer
