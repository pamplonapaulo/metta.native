import React, { useContext } from 'react'

import { Image, View, Text, TouchableOpacity, Linking } from 'react-native'

import * as MailComposer from 'expo-mail-composer'

import { SimpleLineIcons, MaterialIcons, FontAwesome5, Entypo, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons'

import styles from './styles'

import Context from '../../../../../components/user/configContext'

function Details ({ navigation }) {
  const details = navigation.getParam('details')

  const ctx = useContext(Context)

  const message = `Olá, ${details.name}. Gostaria de obter mais informações sobre o local.`

  function sendMail () {
    MailComposer.composeAsync({
      subject: `Mantra App: ${details.name}`,
      recipients: [details.email],
      body: message
    })
  }

  function sendWhatsapp () {
    Linking.openURL(`whatsapp://send?phone=${details.whatsapp}&text=${message}`)
  }

  return (
    <View style={styles.pageContainer}>

      <Image
        style={styles.coverImg}
        source={{ uri: 'https://patrimonioespiritual.files.wordpress.com/2016/01/img_1565.jpg?w=1180&h=786' }}
      />

      <View style={[styles.imgBottom]}>

        <View style={[styles.widthHalf, styles.verticalBottom]}>
          <Text style={[
            styles.imgBottomText,
            styles.left,
            styles.textShadow
          ]}
          >{details.doctrine}
          </Text>
        </View>

        <View style={[styles.right, styles.rightPadding, styles.widthFull]}>

          <View style={[styles.row, styles.widthHalf, styles.right]}>
            <Text style={[
              styles.imgBottomText,
              styles.right,
              styles.widthFull,
              styles.textShadow
            ]}
            >🚩 {details.historyCheckedIns}
            </Text>
          </View>

          <View style={[styles.row, styles.widthHalf, styles.right]}>
            <Text style={[
              styles.imgBottomText,
              styles.right,
              styles.widthFull,
              styles.textShadow
            ]}
            >👍 {details.rate}
            </Text>
          </View>

        </View>

      </View>

      <View style={styles.topPadding}>

        <View style={styles.box}>
          <Text style={styles.text}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab placeat consectetur atque beatae animi sapiente eos recusandae esse sequi dolor, voluptate iusto quaerat illo quia cupiditate! Voluptatibus natus perferendis corporis.</Text>
        </View>

        <View style={styles.box}>
          <View style={styles.actions}>

            <TouchableOpacity
              style={[styles.btnBig, styles.spaceCadet]} 
              onPress={() => {
                ctx.setNavBackwards(true, 'Details', navigation)
                navigation.navigate('Schedule', { rituals: details })
              }}
            >
              <AntDesign name='calendar' size={20} color='#000' />
              <Text style={styles.btnText}>Schedule</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.btnBig, styles.btnOff]}>
              <SimpleLineIcons name='bubbles' size={20} color='#ccc' />
              <Text style={[styles.btnText, styles.btnTextOff]}>Reviews</Text>
            </TouchableOpacity>

          </View>
        </View>

        <View style={styles.box}>

          <View style={styles.row}>
            <Text style={styles.text}>Tipical session: {details.tipicalSeatingLength} minutes</Text>
          </View>

          <View style={styles.row}>
            <Text style={[
              styles.text,
              styles.widthHalf
            ]}
            >
              {details.needsAppointment ? 'Appointment required' : 'Appointment not required'}
            </Text>

            <Text style={[
              styles.text,
              styles.widthHalf,
              styles.right
            ]}
            >Capacity: {details.fullCapacity}
            </Text>
          </View>

        </View>

        <View style={[styles.box]}>
          <View style={styles.actions}>

            <TouchableOpacity style={[styles.btnLite, styles.whatsapp]} onPress={sendWhatsapp}>
              <FontAwesome5 name='whatsapp' size={20} color='#fff' />
              <Text style={styles.btnTextLite} color='#fff'>Whatsapp</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.btnLite, styles.candyPink]} onPress={sendMail}>
              <MaterialCommunityIcons name='email-outline' size={20} color='#fff' />
              <Text style={styles.btnTextLite} color='#fff'>E-mail</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.btnLite, styles.cadetBlue]}>
              <Entypo name='share' size={20} color='#fff' />
              <Text style={styles.btnTextLite} color='#fff'>Share</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.btnLite, styles.minionYellow]}>
              <MaterialIcons name='location-on' size={20} color='#fff' />
              <Text style={styles.btnTextLite} color='#fff'>Check-in</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.btnLite, styles.facebook]}>
              <AntDesign name='like2' size={20} color='#fff' />
              <Text style={styles.btnTextLite} color='#fff'>Like</Text>
            </TouchableOpacity>

          </View>
        </View>

      </View>
    </View>
  )
}

export default Details
