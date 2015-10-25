package info.mikasez.controllers;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
   public class Greetings {
        @RequestMapping("/evry")
        public String greeting(Model model) {
            return "greeting";
        }
    }

