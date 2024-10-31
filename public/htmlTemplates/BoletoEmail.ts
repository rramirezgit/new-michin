type Interaction = {
  name: string;
  schedule: string;
};

interface TicketEmailTemplateProps {
  orderNumber: string;
  purchaseDate: string;
  total: string;
  paymentMethod: string;
  visitDate: string;
  accessName: string;
  interactions: Interaction[];
  entrySchedule: string;
  location: string;
  totalPersons: string;
  adults: string;
  children: string;
  ticketId: string;
}


export function ticketEmailTemplate({
  orderNumber,
  purchaseDate,
  total,
  paymentMethod,
  visitDate,
  accessName,
  interactions,
  entrySchedule,
  location,
  totalPersons,
  adults,
  children,
  ticketId,
}: TicketEmailTemplateProps): string {
  
  const interactionsHTML = interactions
    .map(
      (interaction) => `
        <!-- Interaction Section -->
        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="
            background-color: #ffffff;
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 20px; /* Space between boxes */
          "
        >
          <tr>
            <td
              align="center"
              style="
                color: #312a59;
                font-family: Arial, sans-serif;
              "
            >
              <p style="margin: 0 0 0 0;">
                ${interaction.name}
              </p>
              <p style="margin: 10px 0 0 0;">
                ${interaction.schedule}
              </p>
            </td>
          </tr>
        </table>
      `
    )
    .join('');

  return `
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Ticket</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f4f4f4;">
    <!--[if mso]>
      <style type="text/css">
        body, table, td {font-family: Arial, sans-serif !important;}
      </style>
    <![endif]-->
    <table
      align="center"
      width="100%"
      cellpadding="0"
      cellspacing="0"
      border="0"
      style="background-color: #f4f4f4; margin: 0; padding: 0;"
    >
      <tr>
        <td align="center" style="padding: 20px 0;">
          <table
            width="400"
            cellpadding="0"
            cellspacing="0"
            border="0"
            style="
              width: 100%;
              max-width: 400px;
              background-color: #ffffff;
              border: 1px solid #ccc;
              border-radius: 10px;
            "
          >
            <!-- Email Content -->
            <tr>
              <td
                align="center"
                style="
                  padding: 20px;
                  text-align: center;
                  font-family: Arial, sans-serif;
                "
              >
                <!-- Main Table with Spacing -->
                <table
                  width="100%"
                  cellpadding="0"
                  cellspacing="0"
                  border="0"
                  style="border-collapse: collapse;"
                >
                  <!-- Row 1 -->
                  <tr>
                    <td
                      width="47%"
                      style="
                        padding: 10px;
                        background-color: #f0f0f0;
                        color: #747474;
                        border-radius: 5px;
                        font-family: Arial, sans-serif;
                      "
                    >
                      <span style="font-size: 13px;">Número de pedido</span><br />${orderNumber}
                    </td>
                    <td width="6%" style="font-size: 0; line-height: 0;">&nbsp;</td>
                    <td
                      width="47%"
                      style="
                        padding: 10px;
                        background-color: #f0f0f0;
                        color: #747474;
                        border-radius: 5px;
                        font-family: Arial, sans-serif;
                      "
                    >
                      <span style="font-size: 13px;">Fecha de Compra</span><br />${purchaseDate}
                    </td>
                  </tr>
                  <!-- Space Between Rows -->
                  <tr>
                    <td colspan="3" height="11" style="font-size: 0; line-height: 0;">
                      &nbsp;
                    </td>
                  </tr>
                  <!-- Row 2 -->
                  <tr>
                    <td
                      width="47%"
                      style="
                        padding: 10px;
                        background-color: #f0f0f0;
                        color: #747474;
                        border-radius: 5px;
                        font-family: Arial, sans-serif;
                      "
                    >
                      <span style="font-size: 13px;">Total</span><br /><span style="color: #312a59;">${total}</span>
                    </td>
                    <td width="6%" style="font-size: 0; line-height: 0;">&nbsp;</td>
                    <td
                      width="47%"
                      style="
                        padding: 10px;
                        background-color: #f0f0f0;
                        color: #747474;
                        border-radius: 5px;
                        font-family: Arial, sans-serif;
                      "
                    >
                      <span style="font-size: 13px;">Método de pago</span><br />${paymentMethod}
                    </td>
                  </tr>
                </table>
                <h2
                  style="
                    color: #312a59;
                    margin-top: 20px;
                    font-family: Arial, sans-serif;
                  "
                >
                  Tu visita del ${visitDate}
                </h2>
                <!-- Gradient Background Section -->
                <table
                  width="80%"
                  cellpadding="0"
                  cellspacing="0"
                  border="0"
                  style="
                    background-color: #66b2ff;
                    background-image: linear-gradient(to bottom, #66b2ff, #336699);
                    border-radius: 10px;
                    margin: 20px auto;
                  "
                >
                  <!--[if gte mso 9]>
                    <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:400px;height:auto;">
                      <v:fill type="gradient" color="#66b2ff" color2="#336699" angle="180" />
                      <v:textbox inset="0,0,0,0">
                  <![endif]-->
                  <tr>
                    <td
                      align="center"
                      style="
                        padding: 20px;
                        position: relative;
                        overflow: hidden;
                        color: #ffffff;
                        font-family: Arial, sans-serif;
                      "
                    >
                      <!-- First White Box for Text and QR -->
                      <table
                        width="100%"
                        cellpadding="0"
                        cellspacing="0"
                        border="0"
                        style="
                          background-color: #ffffff;
                          border-radius: 10px;
                          padding: 20px;
                          margin-bottom: 20px; /* Space between boxes */
                        "
                      >
                        <tr>
                          <td
                            align="center"
                            style="
                              color: #312a59;
                              font-family: Arial, sans-serif;
                            "
                          >
                            <p style="margin: 0 0 10px 0; font-size: 15px;">
                              ${accessName}
                            </p>
                            <img
                              src="qr-code-placeholder.png"
                              alt="QR Code"
                              width="150"
                              height="150"
                              style="display: block; margin: 0 auto;"
                            />
                          </td>
                        </tr>
                      </table>
                      <!-- Interaction Sections -->
                      ${interactionsHTML}
                    </td>
                  </tr>
                  <!--[if gte mso 9]>
                      </v:textbox>
                    </v:rect>
                  <![endif]-->
                </table>
                <!-- Additional Information -->
                <div
                  style="
                    color: #312a59;
                    text-align: center;
                    font-family: Arial, sans-serif;
                  "
                >
                  <p style="margin: 0 0 16px 0; font-size: 13px;">
                    <strong>Horario de ingreso:</strong> ${entrySchedule}
                  </p>
                  <p style="margin: 0 0 16px 0; font-size: 13px;">
                    <strong>Ubicación:</strong> ${location}
                  </p>
                  <p style="margin: 0 0 16px 0; font-size: 13px;">
                    <strong>Total de personas:</strong> ${totalPersons}
                  </p>
                  <p style="margin: 0 0 16px 0; font-size: 13px;">
                    <strong>Adultos:</strong> ${adults} <strong>Niños:</strong> ${children}
                  </p>
                  <div style="display: flex; justify-content: center;">
                    <hr style="border: 0.5px solid #ccc; margin: 16px 0; width: 90%;" />
                  </div>
                  <p style="margin: 0 0 16px 0; font-size: 13px;">
                    <strong>Ticket ID:</strong> ${ticketId}
                  </p>
                </div>
                   
              </td>
            </tr>
            <!-- End of Content -->
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
  `;
}
