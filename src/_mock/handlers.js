import { rest } from "msw";

const handlers = [
  rest.get("/getAllUser", (req, res, context) => {
    const user = localStorage.getItem("candidates");
    return res(
      context.status(200),
      context.json(JSON.parse(user))
    );
  }),

  rest.post("/newUser", (req, res, context) => {
      const user = localStorage.getItem("candidates");
      const obj = {
        'id': req.body, 
        'full_name': '',
        'email': '',
        'phone_number': '',
        'min_salary': '',
        'max_salary': '',
        'skills': [],
        'seniority': '',
        'experience': '',
        'resume': [],
        'actions': [{
          type: 'added',
          title: '',
          from: '',
          to: '',
          time: new Date().getTime()
      }]
      }
      if(!!user){
        const parsed = JSON.parse(user);
        parsed.push(obj);
        localStorage.setItem("candidates", JSON.stringify(parsed));
      }else{
        localStorage.setItem("candidates", JSON.stringify([obj]));
      }
  
      return res(
        context.status(200),
        context.json({ stat: 1 })
      );
  }),
];

export { handlers, rest };