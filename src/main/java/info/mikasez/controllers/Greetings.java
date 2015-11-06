package info.mikasez.controllers;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
   public class Greetings {
        @RequestMapping("/state/{name}")
        public String state(@PathVariable String name, Model model) {
            model.addAttribute("name", name);
            System.out.println(name);
            return "greeting";
        }
        @RequestMapping(value = "/state", method = RequestMethod.POST)
        public String stateRedirect(@RequestParam(defaultValue = "Evry") String state, Model model) {
            model.addAttribute("name", state);
            return "greeting";
        }

        @RequestMapping("/")
        public String index(){
            return "index";
        }

        @RequestMapping(value = "/test", method = RequestMethod.POST)
        public String testBacks(@RequestParam String options){
            if(options.equals("cloud")) {
                return "testCloud";
            } else if(options.equals("clear")){
                return "testClear";
            } else {
                return "testRain";
            }
        }


    }

