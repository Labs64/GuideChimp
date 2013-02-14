using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using LmBoxClient.Entities;

namespace LmBoxClient
{
    class ConsoleWriter
    {
        public static void WriteEntity<T>(String msg, T entity) where T : IEntity
        {
            Console.WriteLine(msg);
            Console.WriteLine(entity.ToString());
            Console.WriteLine("");
        }

        public static void WriteMsg(String msg)
        {
            Console.WriteLine(msg);
            Console.WriteLine("");
        }

        public static void WriteList<T>(String msg, List<T> entitiesList) where T : IEntity
        {
            Console.WriteLine(msg);
            foreach (IEntity entity in entitiesList)
            {
                Console.WriteLine(entity.ToString());
            }
            Console.WriteLine("");
        }
    }
}
