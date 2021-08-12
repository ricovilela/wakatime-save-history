import dust from 'dustjs-helpers'
import dateFormat from 'dateformat'
import fetch from 'node-fetch'

class Utils {
  async getApiData (url) {
    return new Promise((resolve) => {
      fetch(url, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' }
      })
        .then(async (response) => {
          if (!response.ok) {
            console.log('error on receive de datas')
          } else {
            resolve(response.json())
          }
        })
        .catch(async (error) => {
          console.log(error)
        })
    })
  }

  dateFormatNow () {
    return dateFormat(new Date(), 'yyyy-mm-dd')
  }

  // CALL ALL DUST HELPERS
  async callDustHelpers () {
    // GET DAY OF WEEK TRANSLATE
    dust.helpers.formatDateDay = function (chunk, context, bodies, params) {
      const value = dust.helpers.tap(params.value, chunk, context)

      const now = new Date(value)
      const days = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ]
      const day = days[now.getDay()]

      return chunk.write(day)
    }

    dust.helpers.formatDate = function (chunk, context, bodies, params) {
      const value = dust.helpers.tap(params.value, chunk, context)

      const timeset = dateFormat(new Date(value), 'dd-mm-yyyy')

      return chunk.write(timeset)
    }

    // GET ONLY DATE
    dust.helpers.formatHour = function (chunk, context, bodies, params) {
      const value = dust.helpers.tap(params.value, chunk, context)

      const splitHour = value.split(':')
      const parseHour = parseInt(splitHour[0])
      const parseMinute = parseInt(splitHour[1])

      if (parseFloat(process.env.HOURS_DEV_PLUS) > 0) {
        let hoursMinutes = 0

        if (parseHour > 0) hoursMinutes = parseHour * 60

        const sum = hoursMinutes + parseMinute
        // ADD 50% TO RESEARCH, WRITE DOCUMENTATION, DBASE, AND OTHERS THINGS IF NOT CODING BUT PART OF CODING
        const percertPlus = sum * parseFloat(process.env.HOURS_DEV_PLUS)
        const consPerc = sum + percertPlus

        const m = consPerc % 60
        const h = (consPerc - m) / 60
        const HHMM = h.toString() + ':' + (m < 10 ? '0' : '') + Math.round(m)

        return chunk.write(HHMM)
      } else {
        return chunk.write(
          parseHour + ':' + (parseMinute < 10 ? '0' : '') + parseMinute
        )
      }
    }
  }
}

export { Utils }
