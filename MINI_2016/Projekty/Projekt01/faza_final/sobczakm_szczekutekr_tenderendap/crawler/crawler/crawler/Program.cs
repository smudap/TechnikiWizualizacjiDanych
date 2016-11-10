using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Reflection;
using System.Runtime.Serialization;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using HtmlAgilityPack;

namespace crawler
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            var poslowie = new List<Posel>();

            for (var i = 1; i < 470; i++)
            {
                var url = $"http://www.sejm.gov.pl/Sejm8.nsf/posel.xsp?id={i:000}";


                var request = (HttpWebRequest) WebRequest.Create(url);
                request.ContentType = "application/x-www-form-urlencoded";
                request.Method = "GET";
                request.UserAgent =
                    "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2357.124 Safari/537.36";
                request.AllowAutoRedirect = false;
                request.CookieContainer = new CookieContainer();

                var response = (HttpWebResponse) request.GetResponse();
                string pageSource;
                var responseStream = response.GetResponseStream();
                if (responseStream == null)
                    continue;

                using (var sw = new StreamReader(responseStream, Encoding.UTF8))
                {
                    pageSource = sw.ReadToEnd();
                }


                var htmlDoc = new HtmlDocument
                {
                    OptionFixNestedTags = true,
                    OptionCheckSyntax = false
                };
                htmlDoc.LoadHtml(pageSource);

                var bodyNode = htmlDoc.DocumentNode?.SelectSingleNode("//body");

                if (bodyNode != null)
                {
                    var posel = HttpUtility.HtmlDecode(bodyNode.SelectSingleNode("//h1").InnerText);
                    var wybrany =
                        HttpUtility.HtmlDecode(
                            bodyNode.SelectSingleNode("//ul[@class='data']//li[1]//p[@class='right']").InnerText);
                    var lista =
                        HttpUtility.HtmlDecode(
                            bodyNode.SelectSingleNode("//ul[@class='data']//li[2]//p[@class='right']").InnerText);
                    var klub =
                        HttpUtility.HtmlDecode(
                            bodyNode.SelectSingleNode("//ul[@class='data']//p[@id='lblKlub']").NextSibling.InnerText);
                    var okreg = HttpUtility.HtmlDecode(bodyNode.SelectSingleNode("//p[@id='okreg']").InnerText);
                    var urodzony = bodyNode.SelectSingleNode("//p[@id='urodzony']").InnerText;
                    var wyksztalcenie =
                        HttpUtility.HtmlDecode(
                            bodyNode.SelectSingleNode("//div[@class='cv']//li[2]//p[@class='right']").InnerText);

                    urodzony = HttpUtility.HtmlDecode(urodzony);

                    var match = Regex.Match(urodzony, "(\\d{2,2}-\\d{2,2}-\\d{2,4}),\\s*([\\w\\s]+)");
                    var dataUrodzenia = match.Groups[1].Value;
                    var miejsceUrodzenia = match.Groups[2].Value;

                    match = Regex.Match(okreg, "(\\d+)\\s*(\\w+)");
                    var okregNr = match.Groups[1].Value;
                    var okregMiejscowosc = match.Groups[2].Value;


                    var p = new Posel
                    {
                        ImieNazwisko = posel,
                        OkregNr = int.Parse(okregNr),
                        OkregMiejscowość = okregMiejscowosc,
                        DataUrodzenia = dataUrodzenia,
                        MiejsceUrodzenia = miejsceUrodzenia,
                        Wyksztalcenie = wyksztalcenie,
                        Klub = klub,
                        KlubSkrot = ConvertToShortcut(klub),
                        Wybrany = DateTime.Parse(wybrany),
                        Lista = lista
                    };

                    poslowie.Add(p);
                }
            }


            Encoding utf8WithoutBom = new UTF8Encoding(false);
            File.WriteAllText("poslowie.csv", poslowie.ToCsv(","), utf8WithoutBom);
        }

        private static string ConvertToShortcut(string klub)
        {
            switch (klub)
            {
                case "Klub Parlamentarny Prawo i Sprawiedliwość":
                    return "PiS";
                case "Klub Parlamentarny Platforma Obywatelska":
                    return "PO";
                case "Klub Poselski Kukiz'15":
                    return "Kukiz15";
                case "Klub Poselski Nowoczesna":
                    return "N";
                case "Klub Parlamentarny Polskiego Stronnictwa Ludowego":
                    return "PSL";
                case "Poseł niezrzeszony":
                    return "niez.";
                case "Koło Poselskie Europejscy Demokraci":
                    return "KPED";
                case "Koło Poselskie Wolni i Solidarni":
                    return "KPWiS";
            }

            return String.Empty;
        }
    }

    internal class Posel
    {
        public string ImieNazwisko { get; set; }
        public int OkregNr { get; set; }
        public string OkregMiejscowość { get; set; }
        public string DataUrodzenia { get; set; }
        public string MiejsceUrodzenia { get; set; }
        public string Wyksztalcenie { get; set; }
        public DateTime Wybrany { get; set; }
        public string Klub { get; set; }
        public string Lista { get; set; }
        public string KlubSkrot { get; set; }
    }

    public static class CsvHelper
    {
        public static string ToCsv<T>(this IEnumerable<T> objectlist, string separator)
        {
            var t = typeof(T);
            var properties = t.GetProperties()
                .Where(p => !p.GetCustomAttributes(typeof(IgnoreDataMemberAttribute)).Any()).ToArray();
            var fields = t.GetFields()
                .Where(p => !p.GetCustomAttributes(typeof(IgnoreDataMemberAttribute)).Any()).ToArray();

            var headerNames = properties.Select(p => p.Name).ToList();
            headerNames.AddRange(fields.Select(f => f.Name));

            var header = string.Join(separator, headerNames.ToArray());

            var csvdata = new StringBuilder();
            csvdata.AppendLine(header);

            foreach (var o in objectlist)
                csvdata.AppendLine(ToCsvFields(separator, properties, fields, o));

            return csvdata.ToString();
        }

        public static string ToCsvFields(string separator, PropertyInfo[] properties, FieldInfo[] fields, object o)
        {
            var propVals = properties.Select(p => (p.GetValue(o) ?? string.Empty).ToString());
            var fieldVals = fields.Select(f => (f.GetValue(o) ?? string.Empty).ToString());
            var objects = new List<string>();
            objects.AddRange(propVals);
            objects.AddRange(fieldVals);

            return string.Join(",", objects.Select(t => string.Format("\"{0}\"",
                t.Replace("\r", "").Replace("\n", "\\n").Replace("\"", "\\\""))));
        }


        public static IEnumerable<T> FromCsv<T>(this T type, string csv, string separator)
        {
            var t = typeof(T);

            var lines = csv.Split(new[] {"\r\n"}, StringSplitOptions.RemoveEmptyEntries);

            var headers = lines[0].Split(new[] {separator}, StringSplitOptions.RemoveEmptyEntries);

            var properties = t.GetProperties().Where(p => headers.Contains(p.Name)).ToArray();
            var fields = t.GetFields().Where(f => headers.Contains(f.Name)).ToArray();

            return lines.Skip(1)
                .Select(line => GetInstaceFromLine<T>(separator, t, line, headers, properties, fields)).ToList();
        }

        private static T GetInstaceFromLine<T>(string separator, Type t, string line, string[] headers,
            PropertyInfo[] properties, FieldInfo[] fields)
        {
            var instance = (T) Activator.CreateInstance(t);

            var pattern = string.Format(@"""\s*{0}\s*""", separator);
            var vals = Regex.Split(line.Substring(1, line.Length - 2), pattern);
            for (var i = 0; i < headers.Length; i++)
            {
                var val = vals[i].Replace("\\n", "\r\n").Replace("\\\"", "\"");
                if (properties.Any(p => p.Name == headers[i]))
                {
                    var property = properties.Where(p => p.Name == headers[i]).ToArray()[0];
                    var o = property.PropertyType.IsEnum
                        ? Enum.Parse(property.PropertyType, val, true)
                        : Convert.ChangeType(val, property.PropertyType);
                    property.SetValue(instance, o);
                }
                if (fields.Any(f => f.Name == headers[i]))
                {
                    var field = fields.Where(p => p.Name == headers[i]).ToArray()[0];
                    var o = field.FieldType.IsEnum
                        ? Enum.Parse(field.FieldType, val, true)
                        : Convert.ChangeType(val, field.FieldType);
                    field.SetValue(instance, o);
                }
            }
            return instance;
        }
    }
}