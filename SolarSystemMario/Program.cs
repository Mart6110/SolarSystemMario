using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO.Ports;
using System.Diagnostics;

namespace SolarSystemMario
{
    public class Program
    {

        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();

            SerialPort SerialPort;

            SerialPort = new SerialPort("COM5", 9600);

            try
            {
                SerialPort.Open();

                bool haveNumber = false;
                string number = string.Empty;

                while (!haveNumber)
                {
                    number = SerialPort.ReadLine();
                    if (!string.IsNullOrEmpty(number))
                    {
                        haveNumber = true;
                    }
                }

                if (haveNumber)
                {
                    Debug.WriteLine(number + Environment.NewLine);
                }
            }
            catch
            {
                Debug.WriteLine("Unable to open COM port.");
            }

        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
