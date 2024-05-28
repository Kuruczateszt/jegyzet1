using Microsoft.VisualStudio.TestTools.UnitTesting;
using celloveszetCLI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace celloveszetCLI.Tests
{
    [TestClass()]
    public class CellovoTests
    {
        [TestMethod()]
        public void LegnagyobbLovesTest1()
        {
            //22; 29; 12; 23 = &gt; 29
            var cellovo = new Cellovo("asdf;22;29;12;23");
            Assert.AreEqual(29, cellovo.LegnagyobbLoves());
        }
        public void LegnagyobbLovesTest2()
        {
            //16; 45; 87; 33; = &gt; 87
            var cellovo = new Cellovo("sdfg;16;45;87;33");
            Assert.AreEqual(29, cellovo.LegnagyobbLoves());
        }
        public void LegnagyobbLovesTest3()
        {
            //96; 49; 67; 45 = &gt; 96
            var cellovo = new Cellovo("xcvb;96;49;67;45");
            Assert.AreEqual(29, cellovo.LegnagyobbLoves());
        }
        public void LegnagyobbLovesTest4()
        {
            //44; 3; 12; 77 = &gt; 77
            var cellovo = new Cellovo("fk;44;3;12;77");
            Assert.AreEqual(29, cellovo.LegnagyobbLoves());
        }
    }
}