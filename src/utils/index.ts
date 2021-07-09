import dust from 'dustjs-helpers'
import dateFormat from 'dateformat'
import nodemailer from 'nodemailer'
import hbs from 'nodemailer-express-handlebars'
import path from 'path'

class Utils {
  checkCredentials (req, res) {
    if (!req.session.uuid) {
      res.redirect('/')
    }
  }

  kbaseSendMail (email, tittle, content) {
    const transport = nodemailer.createTransport({
      host: 'mail.windel.com.br',
      port: 465,
      auth: {
        user: 'ricardo.vilela@windel.com.br',
        pass: 'Ricardo2021Windel!'
      }
    })

    transport.use('compile', hbs({
      viewEngine: {
        defaultLayout: undefined,
        partialsDir: path.resolve('./src/views/partials/mail')
      },
      viewPath: path.resolve('./src/views/partials/mail'),
      extName: '.html'
    }))

    transport.sendMail({
      to: email,
      from: 'Windel Integrador<integrador@windel.com.br>',
      subject: `Windel Integrador - ${tittle}`,
      text: content,
      template: 'news',
      context: { tittle, content }
    }, (err) => {
      if (err) {
        console.log(err)
      }
    })
  }

  // CALL ALL HELPERS
  async callDustHelpers () {
    // DUST HELPER TO TRANSFORM TIMESTAMP IN DATE BR WITH HOUR
    dust.helpers.formatDateHour = function (chunk, context, bodies, params) {
      const value = dust.helpers.tap(params.value, chunk, context)

      if (value) {
        const timeset = dateFormat(new Date(value), 'dd-mm-yyyy HH:MM')

        return chunk.write(timeset)
      }
    }

    // DUST HELPER TO TRANSFORM TIMESTAMP IN DATE BR
    dust.helpers.formatDate = function (chunk, context, bodies, params) {
      const value = dust.helpers.tap(params.value, chunk, context)

      const timeset = dateFormat(new Date(value), 'dd-mm-yyyy')

      return chunk.write(timeset)
    }

    dust.helpers.getSinc = async function (chunk, context, bodies, params) {
      const value = dust.helpers.tap(params.value, chunk, context)

      if (value) {
        chunk.write(`<i class="mdi mdi-table-arrow-right" style="color: red;"></i> <span style="color: red;">${value}</span>`)
      }

      return ''
    }

    dust.helpers.getSincReplic = async function (chunk, context, bodies, params) {
      const value = dust.helpers.tap(params.value, chunk, context)

      if (value) {
        chunk.write('<button type="button" class="btn btn-secondary" id="add-client">Aguardando</button>')
      }

      return ''
    }

    // DUST HELPER TO TRANSFORM TIMESTAMP IN DATE BR WHITH EXT
    dust.helpers.formatDateExt = function (chunk, context, bodies, params) {
      const value = dust.helpers.tap(params.value, chunk, context)

      const timeset = dateFormat(new Date(value), 'd, mmmm, yyyy HH:MM')

      return chunk.write(timeset)
    }

    dust.helpers.formatText = function (chunk, context, bodies, params) {
      const value = dust.helpers.tap(params.value, chunk, context)

      const result = value.replace(/(?:\r\n|\r|\n)/g, '<br>')

      return chunk.write(result)
    }

    dust.helpers.formatTextList = function (chunk, context, bodies, params) {
      const value = dust.helpers.tap(params.value, chunk, context)

      const result = value.substr(0, 100)

      return chunk.write(result + '...')
    }

    dust.helpers.formatTextLength = function (chunk, context, bodies, params) {
      let result

      const value = dust.helpers.tap(params.value, chunk, context)

      if (value.length > 55) {
        result = value.substr(0, 55) + '...'
      } else {
        result = value
      }

      return chunk.write(result)
    }

    dust.helpers.ifChecked = function (chunk, context, bodies, params) {
      let result

      const value = dust.helpers.tap(params.value, chunk, context)

      if (value === '0') {
        result = ''
      } else if (value === '1') {
        result = 'checked'
      }

      return chunk.write(result)
    }
  }
}

export { Utils }
