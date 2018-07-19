
import React from 'react';
import {Text,View} from 'react-native';

const Header = (props)=>
{
    

    return(
        <View style={styles.viewStyle}>
            <Text style={styles.textStyle}>{props.headerText}</Text>
        </View>
    );
}
const styles=
    {
        viewStyle:
            {
                backgroundColor:'#EEEEEE',
                justifyContent:'center',
                alignItems:'center',
                paddingTop:7,
                height:60,
                shadowColor:'#000',
                elevation: 4,
                position:'relative'
            },
        textStyle:
            {
                fontSize:23,
                color:'#000'
            }
    }


export default Header;