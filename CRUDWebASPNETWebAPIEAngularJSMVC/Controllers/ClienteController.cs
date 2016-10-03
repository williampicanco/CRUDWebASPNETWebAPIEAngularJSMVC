using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CRUDWebASPNETWebAPIEAngularJSMVC.Models;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using System.Data.Entity;
using System.Web.Http.Description;
using System.Data.Entity.Infrastructure;

namespace CRUDWebASPNETWebAPIEAngularJSMVC.Controllers
{
    [RoutePrefix("api/cliente")]
    public class ClienteController : ApiController
    {
        private NDEngenhariaESoftwareEntities dc = new NDEngenhariaESoftwareEntities();

        [HttpGet]
        public HttpResponseMessage getClientes()
        {
            var serializeData = JsonConvert.SerializeObject(dc.Cliente.ToList());
            var response = new HttpResponseMessage(HttpStatusCode.OK);
            response.Content = new StringContent(serializeData);
            response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            return response;
        }

        [HttpGet]
        [Route("{id}")]
        public HttpResponseMessage find(int id)
        {
            var serializeData = JsonConvert.SerializeObject(dc.Cliente.Find(id));
            var response = new HttpResponseMessage(HttpStatusCode.OK);
            response.Content = new StringContent(serializeData);
            response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            return response;
        }

        [HttpPost]
        public void AddCliente(Cliente cliente)
        {
            dc.Cliente.Add(cliente);
            dc.SaveChanges();
        }

        //PUT: api/Cliente/5            
        //[AcceptVerbs("PUT")]
        [HttpPut]
        //[Route("api/Cliente/{id:int}")]
        public IHttpActionResult EditCliente(int id, Cliente cliente)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if(id != cliente.ClienteId)
            {
                return BadRequest();
            }
            dc.Entry<Cliente>(cliente).State = EntityState.Modified;
            try
            {
                dc.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClienteExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return StatusCode(HttpStatusCode.NoContent);
        }

        private bool ClienteExists(int id)
        {
            throw new NotImplementedException();
        }

        [HttpDelete]
        [Route("{id}")]
        public void DeleteCliente(int id)
        {
            dc.Cliente.Remove(dc.Cliente.Find(id));
            dc.SaveChanges();
        }
    }
}
