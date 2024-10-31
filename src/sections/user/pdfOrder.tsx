/* eslint-disable react-hooks/exhaustive-deps */

'use client';

// Ejecuta solo en cliente en Next.js

import JSPDF from 'jspdf';
import dayjs from 'dayjs';
import QRCode from 'qrcode';
import html2canvas from 'html2canvas';
import { useState, useEffect } from 'react';

import { Box, useTheme, CircularProgress } from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

import { fCurrency } from 'src/utils/format-number';

import { useUserStore } from 'src/store/UserStore';

import ButtonMichin from 'src/components/btn-michin';

import type { OrderProps } from './view/typeOderd';

export interface Interaction {
  availabilityId?: string;
  endTime?: string;
  id?: string;
  orderId?: string;
  productId?: string;
  productName?: string;
  productPrice?: number;
  productSku?: string;
  productType?: string;
  quantity?: number;
  reserveId?: string;
  startTime?: string;
}

export interface TicketEmailTemplateProps {
  access:
    | {
        id: string;
        productName: string;
        productType: 'ACCESS' | 'INTERACTION';
        quantity: number;
        startTime: string;
        endTime: string;
      }
    | undefined;
  interactions: Interaction[];
  ingreso: string;
  ticketId: string;
  totalPersons: number;
  adults: number;
  children: number;
}

export default function GeneratePDF({
  ticketId,
  access,
  interactions,
  ingreso,
  totalPersons,
  adults,
  children,
}: TicketEmailTemplateProps) {
  const [qrCodeURL, setQrCodeURL] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [order, setOrder] = useState<OrderProps | null>(null);

  const { orderByID } = useUserStore();

  const theme = useTheme();
  const smUp = useResponsive('up', 'sm');

  // Generar QR al montar el componente
  useEffect(() => {
    const generateQR = async () => {
      try {
        const qrUrl = await QRCode.toDataURL(ticketId); // Usamos el ticketId para el QR
        setQrCodeURL(qrUrl);
      } catch (error) {
        console.error('Error al generar el código QR:', error);
      }
    };
    generateQR();
  }, [ticketId]);

  const handleGeneratePDF = async () => {
    setLoading(true);
    const orderData = await orderByID(ticketId);
    setOrder(orderData);
  };

  const createPDF = async () => {
    try {
      const ticketElement = document.getElementById(ticketId);
      if (!ticketElement) throw new Error('El elemento del ticket no está disponible');

      const canvas = await html2canvas(ticketElement);
      const imgData = canvas.toDataURL('image/png');

      const pdf = new JSPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(imgData, 'PNG', 100, 100, canvas.width - 200, canvas.height - 200);
      pdf.save(`Michin-Orden-${order?.id}-${order?.customer.name}.pdf`);
    } catch (error) {
      console.error('Error al generar el PDF:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (order) createPDF();
    console.log(order);
  }, [order]);

  const renderInteractions = () =>
    interactions &&
    interactions.length > 0 &&
    interactions.map((interaction, index) => (
      <table
        key={index}
        width="100%"
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '10px',
          padding: '5px',
          marginBottom: '5px',
        }}
      >
        <tr>
          <td align="center" style={{ color: '#312a59', fontFamily: 'Arial, sans-serif' }}>
            <p style={{ margin: '0', fontSize: '13px' }}>{interaction.productName}</p>
            <p style={{ margin: '0px 0 0 0', fontSize: '13px' }}>
              {interaction.startTime} - {interaction.endTime}
            </p>
          </td>
        </tr>
      </table>
    ));

  return (
    <>
      <div
        id={ticketId}
        style={{
          position: 'absolute',
          top: '-9999px',
          width: '400px',
          backgroundColor: '#ffffff',
          borderRadius: '10px',
        }}
      >
        <table align="center" width="100%" style={{ margin: 0, padding: 0 }}>
          <tbody>
            <tr>
              <td align="center">
                <table
                  width="400"
                  style={{
                    width: '100%',
                    maxWidth: '400px',
                    backgroundColor: '#ffffff',
                    border: '1px solid #ccc',
                    borderRadius: '10px',
                  }}
                >
                  <tbody>
                    <tr>
                      <td
                        align="center"
                        style={{
                          padding: '10px',
                          textAlign: 'center',
                          fontFamily: 'Arial, sans-serif',
                        }}
                      >
                        <table width="100%" style={{ borderCollapse: 'collapse' }}>
                          <tbody>
                            <tr>
                              <td
                                width="47%"
                                style={{
                                  padding: '5px',
                                  backgroundColor: '#f0f0f0',
                                  color: '#747474',
                                  borderRadius: '5px',
                                  fontFamily: 'Arial, sans-serif',
                                }}
                              >
                                <span style={{ fontSize: '13px' }}>Total</span>
                                <br />
                                <span style={{ color: '#312a59' }}>
                                  {fCurrency(order?.totalAmount)}
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <h3
                          style={{
                            color: '#312a59',
                            marginTop: '10px',
                            fontFamily: 'Arial, sans-serif',
                            marginBottom: '10px',
                          }}
                        >
                          Tu visita del {dayjs(order?.createdAt).format('DD/MM/YYYY')}
                        </h3>
                        <table
                          width="80%"
                          style={{
                            backgroundColor: '#66b2ff',
                            backgroundImage: 'linear-gradient(to bottom, #66b2ff, #336699)',
                            borderRadius: '10px',
                            margin: '5px auto',
                          }}
                        >
                          <tbody>
                            <tr>
                              <td
                                align="center"
                                style={{
                                  padding: '15px',
                                  position: 'relative',
                                  overflow: 'hidden',
                                  color: '#ffffff',
                                  fontFamily: 'Arial, sans-serif',
                                }}
                              >
                                {access && (
                                  <table
                                    width="100%"
                                    style={{
                                      backgroundColor: '#ffffff',
                                      borderRadius: '10px',
                                      padding: '5px',
                                      marginBottom: '5px',
                                    }}
                                  >
                                    <tbody>
                                      <tr>
                                        <td
                                          align="center"
                                          style={{
                                            color: '#312a59',
                                            fontFamily: 'Arial, sans-serif',
                                          }}
                                        >
                                          <p
                                            style={{
                                              margin: '0 0 0px 0',
                                              fontSize: '14px',
                                              fontWeight: 'bold',
                                            }}
                                          >
                                            {access.productName}
                                          </p>
                                          <img
                                            src={qrCodeURL}
                                            alt="QR Code"
                                            width="150"
                                            height="150"
                                            style={{ display: 'block', margin: '0 auto' }}
                                          />
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                )}
                                {renderInteractions()}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <div
                          style={{
                            color: '#312a59',
                            textAlign: 'center',
                            fontFamily: 'Arial, sans-serif',
                            marginTop: '10px',
                          }}
                        >
                          <p style={{ margin: '0 0 5px 0', fontSize: '13px' }}>
                            <strong>Horario de ingreso:</strong> {ingreso}
                          </p>
                          <p style={{ margin: '0 0 5px 0', fontSize: '13px' }}>
                            <strong>Ubicación:</strong> Acuario Michin Ciudad de México
                          </p>
                          <p style={{ margin: '0 0 5px 0', fontSize: '13px' }}>
                            <strong>Total de personas:</strong> {totalPersons}
                          </p>
                          <p style={{ margin: '0 0 5px 0', fontSize: '13px' }}>
                            <strong>Adultos:</strong> {adults} <strong>Niños:</strong> {children}
                          </p>
                          <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <hr
                              style={{ border: '0.5px solid #ccc', margin: '5px 0', width: '90%' }}
                            />
                          </div>
                          <p style={{ margin: '0 0 0px 0', fontSize: '13px' }}>
                            <strong>Ticket ID:</strong> {ticketId}
                          </p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {!loading ? (
        <ButtonMichin
          h={smUp ? 30 : 30}
          onClick={handleGeneratePDF}
          color="common.darkBlue"
          InitialBgColor={theme.palette.secondary.main}
          hoverBgColor={theme.palette.primary.main}
          border="none"
          sx={{
            fontSize: {
              xs: '10px',
              sm: '11px',
            },
          }}
        >
          Descargar Comprobante
        </ButtonMichin>
      ) : (
        <Box
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}
        >
          <CircularProgress />
        </Box>
      )}
    </>
  );
}
