using System;
using System.Collections.Generic;
using server.Data;

namespace server.Controllers
{
    public static class AltQuestionCardListExtensions
    {
        public static List<AltQuestionCard> Shuffle(this List<AltQuestionCard> list)
        {
            Random rng = new Random();
            int listLength = list.Count;
            while (listLength > 1)
            {
                listLength--;
                int randomInt = rng.Next(listLength + 1);
                AltQuestionCard value = list[randomInt];
                list[randomInt] = list[listLength];
                list[listLength] = value;
            }
            return list;
        }
    }
}
