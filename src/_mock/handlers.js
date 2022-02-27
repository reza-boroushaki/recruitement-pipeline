import { rest } from "msw";

const handlers = [
  rest.get("/getAllUser", (req, res, context) => {
    const user = localStorage.getItem("candidates");
    return res(
      context.status(200),
      context.json(JSON.parse(user))
    );
  }),

  rest.get("/getUser/:id", (req, res, context) => {
    const { id } = req.params;
    const candidate = localStorage.getItem("candidates");
    const user = JSON.parse(candidate).find(item => item.id === id);
    return res(
    //   context.status(400),
      context.json(user)
    );
  }),

  rest.post("/newUser", (req, res, context) => {
      const user = localStorage.getItem("candidates");
      const obj = {
        'id': req.body, 
        'staging': '0',
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

  rest.patch("/updateUser/:id", (req, res, context) => {
    const { id } = req.params;
    const user = localStorage.getItem("candidates");
    const body = JSON.parse(req.body);
    let parsed = JSON.parse(user);
    const index = parsed.findIndex(item => item.id === id);
    parsed[index] = body;
    localStorage.setItem("candidates", JSON.stringify(parsed));
    return res(
      context.status(200),
      context.json({ stat: 1 })
    );
  }),
  
  rest.delete("/deleteUser/:id", (req, res, context) => {
    const { id } = req.params;
    const user = localStorage.getItem("candidates");
    let parsed = JSON.parse(user).filter(item => item.id !== id);
    localStorage.setItem("candidates", JSON.stringify(parsed));
    return res(
      context.status(200),
      context.json(parsed)
    );
  })
];

export { handlers, rest };