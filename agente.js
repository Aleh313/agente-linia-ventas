/**
 * Módulo Autónomo 24/7 y Comunicación para: Linia & Pursena
 * Rol: Ventas, Presupuestos & Cierre Comercial
 * Carpeta: agentes/06_linia_pursena_ventas/agente.js
 */
const fs = require('fs');
const path = require('path');
const MessageBus = require('../bus_comunicacion');

module.exports = {
  id: 'ag_linia_pursena',
  name: 'Linia & Pursena',
  folder: '06_linia_pursena_ventas',
  role: 'Ventas, Presupuestos & Cierre Comercial',
  sector: 'ventas',

  // Inicialización del agente al arrancar el servidor
  init(db, helpers) {
    console.log('🤖 [Agente Activo 24/7] Linia & Pursena inicializado con sus skills.');
    this.checkPendingMessages();
  },

  // Revisar mensajes entrantes dirigidos a este agente
  checkPendingMessages() {
    const unread = MessageBus.getMessagesForAgent(this.id, true);
    if (unread.length > 0) {
      console.log(`📬 [${this.name}] Tiene ${unread.length} mensajes pendientes en el bus.`);
      unread.forEach(msg => this.processIncomingMessage(msg));
    }
    return unread;
  },

  // Procesar mensaje entrante de otro agente
  processIncomingMessage(msg) {
    console.log(`📨 [${this.name}] Procesando mensaje de ${msg.fromAgentId}: "${msg.subject}"`);
    // Marcar como leído
    MessageBus.markAsRead(msg.id);
    return { ok: true, processed: msg.id };
  },

  // Enviar mensaje o directiva a otro agente
  sendMessage(toAgentId, subject, body, payload = {}, type = 'directiva') {
    return MessageBus.sendMessage({
      fromAgentId: this.id,
      toAgentId,
      type,
      subject,
      body,
      payload
    });
  },

  // Ejecución de tareas programadas o invocadas desde la UI
  async runTask(payload = {}, db = null) {
    return {
      ok: true,
      agentId: this.id,
      name: this.name,
      role: this.role,
      skills: ["Bucle Autónomo de Seguimiento","Calculador Rápido de Presupuestos","Traspaso Comercial a Operaciones"],
      timestamp: new Date().toISOString(),
      message: `[${this.name}] Tarea ejecutada con éxito bajo protocolo autónomo.`
    };
  }
};
