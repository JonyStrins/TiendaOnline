using System;
using System.Collections.Generic;

namespace TiendaOnline.Server.Models;

public partial class Pagoinfo
{
    public int IdpagoInfo { get; set; }

    public string Tipo { get; set; } = null!;

    public string NombreTitular { get; set; } = null!;

    public string Numero { get; set; } = null!;

    public string FechaExpiracion { get; set; } = null!;

    public string Cvv { get; set; } = null!;

    public string? Detalles { get; set; }

    public int UsersIdusers { get; set; }

    public virtual ICollection<Pago> Pagos { get; set; } = new List<Pago>();

    public virtual User UsersIdusersNavigation { get; set; } = null!;
}
